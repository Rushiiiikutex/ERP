
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';


// export default function CollegeAdminLanding() {
//   const [isHovered, setIsHovered] = useState(false);
//     const router = useRouter();

//   const handleLoginRedirect = () => {
//      router.push('/login')
//     // For demo purposes, we'll show an alert
   
//     // window.location.href = '/login';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        
//         {/* Left Side - Branding */}
//         <div className="flex-1 bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 p-12 flex flex-col items-center justify-center text-white relative overflow-hidden">
          
//           {/* Decorative Background Elements */}
//           <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
//           <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
//           <div className="absolute top-1/2 left-0 w-20 h-96 bg-blue-300/10 rounded-r-full blur-lg"></div>
          
//           {/* College Logo */}
//           <div className="bg-white p-6 rounded-2xl mb-8 shadow-lg relative z-10">
//             <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
//               <div className="text-white text-2xl font-bold">PICT</div>
//             </div>
//           </div>
          
//           {/* Title */}
//           <h1 className="text-4xl font-bold text-center mb-4 relative z-10">
//             College Administration
//             <br />
//             <span className="text-blue-200">System</span>
//           </h1>
          
//           {/* CAS ERP Badge */}
//           <div className="mt-12 relative z-10">
//             <div className="w-32 h-32 border-4 border-blue-300/50 rounded-full flex items-center justify-center bg-blue-600/30 backdrop-blur-sm">
//               <div className="text-center">
//                 <div className="text-3xl font-bold">CAS</div>
//                 <div className="text-sm opacity-80">ERP</div>
//               </div>
//             </div>
//           </div>
          
//           {/* Decorative Wave */}
//           <div className="absolute -right-12 top-0 bottom-0 w-24 opacity-20">
//             <svg viewBox="0 0 100 800" className="w-full h-full">
//               <path d="M0,0 Q50,100 0,200 T0,400 T0,600 T0,800" fill="currentColor" />
//             </svg>
//           </div>
//         </div>
        
//         {/* Right Side - Login Access */}
//         <div className="flex-1 p-12 flex flex-col justify-center bg-gray-50">
          
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-red-600 mb-4">Access Portal</h2>
//             <p className="text-gray-600 text-lg">Please click below to access your account</p>
//           </div>
          
//           {/* Login Card */}
//           <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
//             <div className="text-center mb-8">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Student & Staff Portal</h3>
//               <p className="text-gray-600">Access your academic and administrative dashboard</p>
//             </div>
            
//             {/* Login Button */}
//             <button
//               onClick={handleLoginRedirect}
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//               className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
//             >
//               <span>Proceed to Login</span>
//               <svg 
//                 className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </button>
            
//             {/* Reset Button */}
           
            
//             {/* Forgot Password Link */}
        
//           </div>
          
//           {/* Quick Access Links */}
          
       
        
          
//           {/* Copyright */}
        
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from 'next/link';
import { LogIn, ShieldCheck, BookOpen } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Minimal Header */}
      <header className="w-full bg-white border-b border-gray-200 py-4 px-6 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-xl tracking-tight">EduPortal</span>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Decorative Top Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>

          <div className="p-8 sm:p-10 text-center">
            {/* Icon Bubble */}
            <div className="mx-auto h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="h-10 w-10 text-indigo-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Welcome Back
            </h2>
            
            <p className="text-gray-500 mb-8 leading-relaxed">
              Please log in to access your dashboard, view courses, and manage your portal settings.
            </p>

            {/* Single Action Button */}
            <Link 
              href="/login" 
              className="group w-full inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
            >
              <span>Proceed to Login</span>
              <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Footer / Help Link */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/register" className="text-indigo-600 hover:text-indigo-500 font-medium hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Background decoration (Optional) */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
           <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

      </main>
    </div>
  );
}