import React from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import type { Faculty } from '../types';

interface CreateBudgetFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function CreateBudgetForm({ onSubmit, onCancel }: CreateBudgetFormProps) {
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
  const [totalBudget, setTotalBudget] = React.useState(10000000);

  // Mock faculties data - in real app, this would come from an API
  const faculties: Faculty[] = [
    { id: '1', name: 'Faculty of Engineering', code: 'ENG', totalStudents: 1200, researchOutput: 45, accreditation: 'A' },
    { id: '2', name: 'Faculty of Science', code: 'SCI', totalStudents: 800, researchOutput: 38, accreditation: 'A' },
    { id: '3', name: 'Faculty of Arts', code: 'ARTS', totalStudents: 600, researchOutput: 25, accreditation: 'B' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate budget allocations based on faculty metrics
    const allocations = faculties.map(faculty => {
      const studentWeight = 0.3;
      const researchWeight = 0.4;
      const accreditationWeight = 0.3;

      const accreditationScore = faculty.accreditation === 'A' ? 100 : faculty.accreditation === 'B' ? 80 : 60;
      const totalScore = (
        (faculty.totalStudents / 1500) * 100 * studentWeight +
        (faculty.researchOutput / 50) * 100 * researchWeight +
        accreditationScore * accreditationWeight
      );

      return {
        facultyId: faculty.id,
        year: selectedYear,
        totalScore,
        allocatedBudget: (totalBudget * (totalScore / 100)) / faculties.length,
      };
    });

    onSubmit(allocations);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Create New Budget Allocation</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Budget Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {[0, 1, 2].map((offset) => {
                const year = new Date().getFullYear() + offset;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Budget Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Faculty Distribution Preview</h3>
          <div className="space-y-3">
            {faculties.map((faculty) => (
              <div key={faculty.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{faculty.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                    {faculty.accreditation} Grade
                  </span>
                  <span className="text-sm font-medium">
                    ~${((totalBudget / faculties.length) / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Budget Allocation
          </button>
        </div>
      </form>
    </div>
  );
}