import { motion } from 'framer-motion';
import { CreditCard, Send, BarChart, TrendingUp } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

const stats = [
  {
    name: 'Credits Remaining',
    value: '150',
    change: '+5',
    changeType: 'increase',
    icon: CreditCard,
  },
  {
    name: 'Applications Sent',
    value: '25',
    change: '+12',
    changeType: 'increase',
    icon: Send,
  },
  {
    name: 'Response Rate',
    value: '15%',
    change: '+2.3%',
    changeType: 'increase',
    icon: BarChart,
  },
  {
    name: 'Active Campaigns',
    value: '3',
    change: '+1',
    changeType: 'increase',
    icon: TrendingUp,
  },
];

export default function DashboardPage() {
  return (
    <AuthLayout>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your job application performance and analytics
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-6 w-6 text-[#4D3E78]" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {stat.value}
                          </div>
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Application Success Rate</h3>
                <div className="mt-4 h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart coming soon...</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Response Timeline</h3>
                <div className="mt-4 h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart coming soon...</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
}