import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Target } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

const recommendations = [
  {
    title: 'Optimize Your Profile',
    description: 'Add more technical skills to your profile to increase visibility for tech positions.',
    icon: Target,
    action: 'Update Profile',
  },
  {
    title: 'Trending Skills',
    description: 'React and Node.js are highly demanded in your target locations.',
    icon: TrendingUp,
    action: 'Explore Skills',
  },
  {
    title: 'Application Timing',
    description: 'Consider sending applications on Tuesday mornings for better response rates.',
    icon: Lightbulb,
    action: 'Learn More',
  },
];

export default function RecommendationsPage() {
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
            <h1 className="text-2xl font-bold text-gray-900">AI Recommendations</h1>
            <p className="mt-1 text-sm text-gray-500">
              Personalized insights to improve your job search success
            </p>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <recommendation.icon className="h-6 w-6 text-[#4D3E78]" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900">
                      {recommendation.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    {recommendation.description}
                  </p>
                  <div className="mt-6">
                    <button className="btn-primary rounded-lg px-4 py-2 text-sm">
                      {recommendation.action}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow text-center"
          >
            <Lightbulb className="h-12 w-12 text-[#4D3E78] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">More Recommendations Coming Soon</h3>
            <p className="mt-2 text-sm text-gray-500">
              Our AI is learning from your activities to provide even more personalized recommendations.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AuthLayout>
  );
}