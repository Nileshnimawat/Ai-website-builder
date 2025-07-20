export const animation : string = `
        @keyframes hero-entrance {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes text-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes float-1 {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(20px) rotate(180deg); }
        }

        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(15px); }
        }

        @keyframes particle {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .animate-hero-entrance {
          animation: hero-entrance 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 0.8s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in-delay 0.8s ease-out 0.6s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in-delay 0.8s ease-out 0.9s both;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in-delay 0.8s ease-out 1.2s both;
        }

        .animate-fade-in-delay-5 {
          animation: fade-in-delay 0.8s ease-out 1.5s both;
        }

        .animate-text-shimmer {
          background-size: 200% 200%;
          animation: text-shimmer 3s ease-in-out infinite;
        }

        .animate-float-0 {
          animation: float-0 6s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 10s ease-in-out infinite;
        }

        .animate-particle {
          animation: particle linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `