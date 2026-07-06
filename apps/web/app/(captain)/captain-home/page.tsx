import CaptainHomePage from "@/components/CaptainHome";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <CaptainHomePage />
    </ProtectedRoute>
  );
};

export default HomePage;
