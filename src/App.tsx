import React from 'react';
import { Navbar } from './components/Navbar';
import { DashboardStats } from './components/DashboardStats';
import { BudgetTable } from './components/BudgetTable';
import { ScoreForm } from './components/ScoreForm';
import { CreateBudgetForm } from './components/CreateBudgetForm';
import { PlusCircle } from 'lucide-react';

const mockScores = [
  {
    id: '1',
    facultyId: '1',
    year: 2024,
    studentScore: 85,
    researchScore: 90,
    accreditationScore: 95,
    totalScore: 90,
    allocatedBudget: 5000000,
    status: 'APPROVED',
  },
  {
    id: '2',
    facultyId: '2',
    year: 2024,
    studentScore: 80,
    researchScore: 85,
    accreditationScore: 90,
    totalScore: 85,
    allocatedBudget: 4500000,
    status: 'REVIEWED',
  },
] as const;

function App() {
  const [selectedFacultyId, setSelectedFacultyId] = React.useState<
    string | null
  >(null);
  const [isCreating, setIsCreating] = React.useState(false);

  const handleEdit = (id: string) => {
    setSelectedFacultyId(id);
    setIsCreating(false);
  };

  const handleCreateBudget = () => {
    setIsCreating(true);
    setSelectedFacultyId(null);
  };

  const handleCreateSubmit = (allocations: any) => {
    console.log('New budget allocations:', allocations);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Budget Allocation Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and review faculty budget allocations based on
                performance metrics
              </p>
            </div>

            {!isCreating && !selectedFacultyId && (
              <button
                onClick={handleCreateBudget}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Create New Budget
              </button>
            )}
          </div>

          <DashboardStats />

          {isCreating ? (
            <CreateBudgetForm
              onSubmit={handleCreateSubmit}
              onCancel={() => setIsCreating(false)}
            />
          ) : selectedFacultyId ? (
            <ScoreForm
              faculty={{
                id: '1',
                name: 'Faculty of Engineering',
                code: 'ENG',
                totalStudents: 1200,
                researchOutput: 45,
                accreditation: 'A',
              }}
              onSubmit={() => {}}
              onCancel={() => setSelectedFacultyId(null)}
            />
          ) : (
            <BudgetTable scores={mockScores} onEdit={handleEdit} />
          )}
        </div>
      </main>
    </div>
  );
}
export default App; // Ensure this line is present
