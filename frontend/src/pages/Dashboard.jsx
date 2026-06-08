import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../store/slices/memberSlice';
import { fetchProducts } from '../store/slices/productSlice';
import { Users, Package, Calendar, TrendingUp } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import useTheme from '../hooks/useTheme';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list: members } = useSelector((state) => state.members);
  const { list: products } = useSelector((state) => state.products);
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchProducts());
  }, [dispatch]);

  const activeMembers = members.filter(m => {
    const daysLeft = Math.ceil((new Date(m.end_date) - new Date()) / (1000 * 60 * 60 * 24));
    return daysLeft > 0;
  }).length;

  const expiringMembers = members.filter(m => {
    const daysLeft = Math.ceil((new Date(m.end_date) - new Date()) / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 && daysLeft <= 7;
  }).length;

  const totalRevenue = members.reduce((total, member) => {
    return total + (member.membership?.price || 0);
  }, 0);

  const stats = [
    { title: 'Total Members', value: members.length, icon: Users, color: 'primary' },
    { title: 'Active Members', value: activeMembers, icon: Calendar, color: 'success' },
    { title: 'Expiring Soon', value: expiringMembers, icon: TrendingUp, color: 'warning' },
    { title: 'Total Products', value: products.length, icon: Package, color: 'primary' },
  ];

  const expiringTodayList = members.filter(m => {
    const daysLeft = Math.ceil((new Date(m.end_date) - new Date()) / (1000 * 60 * 60 * 24));
    return daysLeft === 0;
  });

  const expiringSoonList = members.filter(m => {
    const daysLeft = Math.ceil((new Date(m.end_date) - new Date()) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 && daysLeft <= 7;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text">Dashboard</h1>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorMap = {
            primary: { bg: 'bg-orange-500', text: 'text-orange-50' },
            success: { bg: 'bg-green-500', text: 'text-green-50' },
            warning: { bg: 'bg-yellow-500', text: 'text-yellow-50' },
          };
          const c = colorMap[stat.color] || colorMap.primary;

          return (
            <div key={index} className="card">
              <div className="mb-4">
                <div className={`p-3 rounded-lg w-full ${c.bg} flex items-center`}>
                  <Icon className={`${c.text} dark:text-white w-6 h-6`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-text">{stat.value}</h3>
              <p className="text-gray-400 text-sm mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-text mb-4">Expiring Today</h2>
            <div className="space-y-3">
              {expiringTodayList.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-text">{member.full_name}</p>
                    <p className="text-sm text-gray-400">{member.cin}</p>
                  </div>
                  <span className="text-sm text-primary">{member.membership?.name}</span>
                </div>
              ))}
              {expiringTodayList.length === 0 && <div className="text-sm text-gray-400">No members expiring today.</div>}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-text mb-4">Expiring Soon</h2>
            <div className="space-y-3">
              {expiringSoonList.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-text">{member.full_name}</p>
                    <p className="text-sm text-gray-400">{member.cin}</p>
                  </div>
                  <span className="text-sm text-primary">{member.membership?.name}</span>
                </div>
              ))}
              {expiringSoonList.length === 0 && <div className="text-sm text-gray-400">No members expiring soon.</div>}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-text mb-4">Low Stock Products</h2>
          <div className="space-y-3">
            {products.filter(p => p.quantity <= 5).slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-text">{product.name}</p>
                  <p className="text-sm text-gray-400">{product.quantity} units left</p>
                </div>
                <span className="text-sm" style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                  {product.quantity === 0 ? 'Out of Stock' : 'Low Stock'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;