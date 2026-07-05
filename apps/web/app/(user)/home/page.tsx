import HomeContent from "@/components/HomeContent";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
};

export default HomePage;
