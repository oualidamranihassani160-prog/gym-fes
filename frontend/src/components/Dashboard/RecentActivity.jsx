import { useEffect, useState } from 'react';
import { memberAPI } from '../../services/api';
import { formatDate } from '../../utils/dateUtils';
import { UserPlus, RefreshCw, Archive } from 'lucide-react';

const RecentActivity = () => {
  const [recentMembers, setRecentMembers] = useState([]);

  useEffect(() => {
    const fetchRecentMembers = async () => {
      try {
        const response = await memberAPI.getAll({ limit: 5 });
        setRecentMembers(response.data);
      } catch (error) {
        console.error('Error fetching recent members:', error);
      }
    };
    fetchRecentMembers();
  }, []);

  const getActivityIcon = (member) => {
    const daysLeft = Math.ceil((new Date(member.end_date) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return <Archive className="w-4 h-4 text-danger" />;
    if (daysLeft <= 7) return <RefreshCw className="w-4 h-4 text-warning" />;
    return <UserPlus className="w-4 h-4 text-success" />;
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-text mb-4">Recent Members</h2>
      <div className="space-y-3">
        {recentMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              {getActivityIcon(member)}
              <div>
                <p className="font-medium text-text">{member.full_name}</p>
                <p className="text-xs text-gray-400">{member.cin}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary">{member.membership?.name}</p>
              <p className="text-xs text-gray-400">Joined: {formatDate(member.start_date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;