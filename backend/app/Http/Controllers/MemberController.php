<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\MembershipType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $query = Member::with('membership');

        if ($request->has('status')) {
            $today = Carbon::today();
            switch ($request->status) {
                case 'archived':
                    // return only soft-deleted (archived) members
                    $query = Member::onlyTrashed()->with('membership');
                    break;
                case 'active':
                    $query->where('end_date', '>', $today->copy()->addDays(7));
                    break;
                case 'expiring_soon':
                    $query->whereBetween('end_date', [$today, $today->copy()->addDays(7)]);
                    break;
                case 'expired':
                    $query->where('end_date', '<', $today);
                    break;
            }
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('cin', 'like', "%{$search}%")
                  ->orWhere('full_name', 'like', "%{$search}%");
            });
        }

        if ($request->has('membership_id')) {
            $query->where('membership_id', $request->membership_id);
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'cin' => 'required|unique:members',
            'full_name' => 'required|string',
            'phone_number' => 'required|string',
            'membership_id' => 'required|exists:membership_types,id',
            'start_date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $membership = MembershipType::find($request->membership_id);
        $endDate = Carbon::parse($request->start_date)->addMonths($membership->duration_months);

        $data = $request->except('image');
        $data['end_date'] = $endDate;
        $data['admin_id'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('members', 'public');
            $data['image_path'] = $path;
        }

        $member = Member::create($data);

        return response()->json($member->load('membership'), 201);
    }

    public function show(Member $member)
    {
        return response()->json($member->load('membership'));
    }

    public function update(Request $request, Member $member)
    {
        $request->validate([
            'cin' => 'required|unique:members,cin,' . $member->id,
            'full_name' => 'required|string',
            'phone_number' => 'required|string',
            'membership_id' => 'required|exists:membership_types,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($member->image_path) {
                Storage::disk('public')->delete($member->image_path);
            }
            $path = $request->file('image')->store('members', 'public');
            $data['image_path'] = $path;
        }

        $member->update($data);

        return response()->json($member->load('membership'));
    }

    public function renew(Request $request, $memberParam)
    {
        $request->validate([
            'membership_id' => 'required|exists:membership_types,id'
        ]);

        // Support both route model binding (Member instance) and raw id
        $id = $memberParam instanceof Member ? $memberParam->id : $memberParam;

        $member = Member::withTrashed()->findOrFail($id);
        $membership = MembershipType::find($request->membership_id);
        $today = Carbon::today();

        // If the member is archived (soft-deleted), restore and start from today
        if ($member->trashed()) {
            $member->restore();
            $startDate = $today;
        } else {
            if ($member->end_date && $member->end_date->gte($today)) {
                $startDate = $member->end_date;
            } else {
                $startDate = $today;
            }
        }

        $endDate = $startDate->copy()->addMonths($membership->duration_months);

        $member->update([
            'membership_id' => $membership->id,
            'start_date' => $startDate,
            'end_date' => $endDate
        ]);

        return response()->json($member->load('membership'));
    }

    public function destroy(Member $member)
    {
        $member->delete();
        return response()->json(['message' => 'Member archived successfully']);
    }

    public function forceDelete(int $id)
    {
        $member = Member::withTrashed()->findOrFail($id);
        
        if ($member->image_path) {
            Storage::disk('public')->delete($member->image_path);
        }
        
        $member->forceDelete();
        return response()->json(['message' => 'Member permanently deleted']);
    }

    public function restore(int $id)
    {
        $member = Member::withTrashed()->findOrFail($id);
        $member->restore();
        return response()->json($member->load('membership'));
    }
}