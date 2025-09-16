export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Dashboard</h1>
              <p className="text-gray-600 mb-6">You have successfully logged in!</p>
              <div className="space-x-4">
                <a href="/student" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200">
                  Student Portal
                </a>
                <a href="/teacher" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-200">
                  Teacher Portal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
