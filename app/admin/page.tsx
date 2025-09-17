export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">🔐 ADMIN DASHBOARD</h1>
        <p className="text-lg text-gray-700">You have successfully accessed the admin area!</p>
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-800">✅ Admin authentication working!</p>
        </div>
      </div>
    </div>
  );
}
