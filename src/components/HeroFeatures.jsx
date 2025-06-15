import React from "react";
import {
  FaSearch,
  FaFilter,
  FaUsers,
  FaBolt,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";

const Card = ({ children, className }) => {
  return (
    <div
      className={`card  sm:w-96 shadow-sm p-6 hover:transition-shadow ${className}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return <div className="card-header">{children}</div>;
};

const CardTitle = ({ children }) => {
  return <h2 className="card-title">{children}</h2>;
};

const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

function HeroFeatures() {
  return (
    <section className="container mx-auto  sm:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to manage your todos efficiently and effectively
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FaSearch className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Smart Search</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Instantly find any todo with our powerful real-time search
              functionality. Search by title and get results as you type.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FaFilter className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Advanced Filtering</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Filter todos by completion status. View all, completed, or pending
              tasks with a single click for better organization.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FaUsers className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              View detailed user information for each todo, including contact
              details, company information, and location data.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <FaBolt className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle>Fast Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Built with modern React and Next.js for lightning-fast
              performance. Optimized loading states and smooth interactions.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <FaShieldAlt className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Error Handling</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Robust error boundaries and graceful error handling ensure a
              smooth experience even when things go wrong.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <FaMobileAlt className="h-6 w-6 text-teal-600" />
            </div>
            <CardTitle>Responsive Design</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Fully responsive design that works perfectly on desktop, tablet,
              and mobile devices with touch-friendly interactions.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default HeroFeatures;
