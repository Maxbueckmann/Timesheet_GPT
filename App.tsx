import { useState, useMemo } from "react";
import { StatusCircle } from "./components/StatusCircle";
import type { SelectionState } from "./types";

// Mock data
const mockData = {
  activities: ['Customer', 'Internal', 'Absence'],
  customers: ['Kunde A', 'Kunde B', 'Microsoft', 'Apple', 'Google'],
  projects: {
    'Kunde A': ['Projekt A', 'Projekt B', 'Projekt C'],
    'Kunde B': ['Projekt X', 'Projekt Y'],
    Microsoft: ['Azure Migration', 'Teams Integration', 'Office 365 Setup'],
    Apple: ['iOS App Development', 'macOS Support', 'App Store Optimization'],
    Google: ['Cloud Platform', 'Analytics Setup', 'Workspace Migration'],
  },
  roles: ['UX', 'UI', 'Developer', 'Project Manager', 'Designer'],
  billingOptions: ['Billable', 'Non-Billable'],
  internalCategories: ['Training', 'Meeting', 'Administration', 'Research', 'Documentation'],
  absenceTypes: ['Vacation', 'Sick Leave', 'Bank Holiday', 'Wellness Day', 'Personal Day']
};

const initialSelections: SelectionState = {
  activity: 'Customer',
  customer: 'Kunde A',
  project: 'Projekt A',
  role: 'UX',
  billing: 'Billable',
};

export default function App() {
  const [selections, setSelections] = useState<SelectionState>(initialSelections);
  const [comment, setComment] = useState('attended Meeting XYZ');

  // Determine which columns should be visible based on current selections
  const visibleColumns = useMemo(() => {
    const columns = ['activity'];
    
    if (selections.activity === 'Customer') {
      columns.push('customer');
      if (selections.customer) {
        columns.push('project');
        if (selections.project) {
          columns.push('role');
          if (selections.role) {
            columns.push('billing');
            if (selections.billing) {
              columns.push('comment');
            }
          }
        }
      }
    } else if (selections.activity === 'Internal') {
      columns.push('internalCategory');
      if (selections.internalCategory) {
        columns.push('comment');
      }
    } else if (selections.activity === 'Absence') {
      columns.push('absenceType');
      if (selections.absenceType) {
        columns.push('comment');
      }
    }
    
    return columns;
  }, [selections]);

  const handleSelection = (column: string, value: string) => {
    const newSelections = { ...selections };
    
    // Clear all selections after the changed column
    const columnIndex = visibleColumns.indexOf(column);
    visibleColumns.slice(columnIndex + 1).forEach(col => {
      delete newSelections[col];
    });
    
    // Set the new selection
    newSelections[column] = value;
    setSelections(newSelections);
    
    // Clear comment if we're starting over
    if (column === 'activity') {
      setComment('');
    }
  };

  const isComplete = useMemo(() => {
    if (selections.activity === 'Customer') {
      return selections.customer && selections.project && selections.role && selections.billing && comment.trim();
    } else if (selections.activity === 'Internal') {
      return selections.internalCategory && comment.trim();
    } else if (selections.activity === 'Absence') {
      return selections.absenceType && comment.trim();
    }
    return false;
  }, [selections, comment]);

  const getStatusMessage = () => {
    if (isComplete) {
      return "Was machst du?";
    }
    return "Aufforderung zur Auswahl";
  };

  const getStatusType = () => {
    if (!isComplete) return 'next';
    return selections.activity === 'Absence' ? 'complete' : 'ready';
  };

  const handleAction = () => {
    if (isComplete) {
      if (selections.activity === 'Absence') {
        alert('Abwesenheit erfasst!');
      } else {
        alert('Timer gestartet!');
      }
      // Reset form
      setSelections(initialSelections);
      setComment('');
    }
  };

  const getOptionsForColumn = (column: string) => {
    switch (column) {
      case 'activity':
        return mockData.activities;
      case 'customer':
        return mockData.customers;
      case 'project':
        return selections.customer ? mockData.projects[selections.customer as keyof typeof mockData.projects] || [] : [];
      case 'role':
        return mockData.roles;
      case 'billing':
        return mockData.billingOptions;
      case 'internalCategory':
        return mockData.internalCategories;
      case 'absenceType':
        return mockData.absenceTypes;
      default:
        return [];
    }
  };

  const getUnselectedOptions = (column: string) => {
    const allOptions = getOptionsForColumn(column);
    return allOptions.filter(option => option !== selections[column]);
  };

  return (
    <div className="bg-[#000000] relative min-h-screen">
      {/* Main container */}
      <div className="absolute h-[314px] left-0 overflow-clip top-[105px] w-full">
        
        {/* Selected options bar */}
        <div className="absolute bg-[#242424] h-[78px] left-[76px] rounded-xl top-[97px] w-[1469px]">
          <div className="flex flex-col justify-center overflow-clip relative size-full">
            <div className="box-border content-stretch flex flex-col gap-2.5 h-[78px] items-start justify-center px-[21px] py-[15px] relative w-[1469px]">
              <div className="box-border content-stretch flex flex-row gap-[39px] items-center justify-start p-0 relative shrink-0 w-full">
                
                {/* Selected Activity */}
                {selections.activity && (
                  <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center p-0 relative shrink-0">
                    <div className="bg-[#5bc47b] h-[54px] relative rounded shrink-0 w-[180px]">
                      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
                        <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
                          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                            <p className="block leading-[1.5] whitespace-pre">{selections.activity}</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
                    </div>
                  </div>
                )}

                {/* Selected Customer */}
                {selections.customer && (
                  <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center p-0 relative shrink-0">
                    <div className="bg-[#5bc47b] h-[54px] relative rounded shrink-0 w-[180px]">
                      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
                        <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
                          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                            <p className="block leading-[1.5] whitespace-pre">{selections.customer}</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
                    </div>
                  </div>
                )}

                {/* Selected Project */}
                {selections.project && (
                  <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center p-0 relative shrink-0">
                    <div className="bg-[#5bc47b] h-[54px] relative rounded shrink-0 w-[180px]">
                      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
                        <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
                          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                            <p className="block leading-[1.5] whitespace-pre">{selections.project}</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
                    </div>
                  </div>
                )}

                {/* Selected Role */}
                {selections.role && (
                  <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center p-0 relative shrink-0">
                    <div className="bg-[#5bc47b] h-[54px] relative rounded shrink-0 w-[180px]">
                      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
                        <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
                          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                            <p className="block leading-[1.5] whitespace-pre">{selections.role}</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
                    </div>
                  </div>
                )}

                {/* Selected Billing */}
                {selections.billing && (
                  <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center p-0 relative shrink-0">
                    <div className="bg-[#5bc47b] h-[54px] relative rounded shrink-0 w-[180px]">
                      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
                        <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
                          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                            <p className="block leading-[1.5] whitespace-pre">{selections.billing}</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
                    </div>
                  </div>
                )}

                {/* Comment Box */}
                {visibleColumns.includes('comment') && (
                  <div className="h-[63px] relative rounded-lg shrink-0 w-[219px]">
                    <div className="absolute border-[0.5px] border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-lg" />
                    <div className="relative size-full">
                      <div className="box-border content-stretch flex flex-row gap-2.5 h-[63px] items-start justify-start p-[10px] relative w-[219px]">
                        <input
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Was machst du?"
                          className="flex flex-col font-['Lexend:Light',_sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[11px] text-[rgba(255,255,255,0.5)] text-left bg-transparent border-none outline-none w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Unselected options below */}
        
        {/* Activities column */}
        {getUnselectedOptions('activity').map((activity, index) => (
          <button
            key={activity}
            onClick={() => handleSelection('activity', activity)}
            className="absolute bg-[#121212] h-[54px] left-[97px] rounded w-[180px] hover:bg-[#2a2a2a] transition-colors"
            style={{ top: `${31 + (index + 1) * 65}px` }}
          >
            <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
              <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
                <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                  <p className="block leading-[1.5] whitespace-pre">{activity}</p>
                </div>
              </div>
            </div>
            <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
          </button>
        ))}

        {/* Customers column */}
        {selections.activity === 'Customer' && getUnselectedOptions('customer').map((customer, index) => (
          <button
            key={customer}
            onClick={() => handleSelection('customer', customer)}
            className="absolute bg-[#121212] h-[54px] left-[316px] rounded w-[180px] hover:bg-[#2a2a2a] transition-colors"
            style={{ top: `${187 + index * 65}px` }}
          >
            <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
              <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
                <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                  <p className="block leading-[1.5] whitespace-pre">{customer}</p>
                </div>
              </div>
            </div>
            <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
          </button>
        ))}

        {/* Projects column */}
        {selections.customer && getUnselectedOptions('project').map((project, index) => (
          <button
            key={project}
            onClick={() => handleSelection('project', project)}
            className="absolute bg-[#121212] h-[54px] left-[535px] rounded w-[180px] hover:bg-[#2a2a2a] transition-colors"
            style={{ top: `${187 + index * 65}px` }}
          >
            <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
              <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
                <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                  <p className="block leading-[1.5] whitespace-pre">{project}</p>
                </div>
              </div>
            </div>
            <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
          </button>
        ))}

        {/* Roles column */}
        {selections.project && getUnselectedOptions('role').map((role, index) => (
          <button
            key={role}
            onClick={() => handleSelection('role', role)}
            className="absolute bg-[#121212] h-[54px] left-[754px] rounded w-[180px] hover:bg-[#2a2a2a] transition-colors"
            style={{ top: `${187 + index * 65}px` }}
          >
            <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
              <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
                <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                  <p className="block leading-[1.5] whitespace-pre">{role}</p>
                </div>
              </div>
            </div>
            <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
          </button>
        ))}

        {/* Billing column */}
        {selections.role && getUnselectedOptions('billing').map((billing, index) => (
          <button
            key={billing}
            onClick={() => handleSelection('billing', billing)}
            className="absolute bg-[#121212] h-[54px] left-[973px] rounded w-[180px] hover:bg-[#2a2a2a] transition-colors"
            style={{ top: `${187 + index * 65}px` }}
          >
            <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
              <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
                <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                  <p className="block leading-[1.5] whitespace-pre">{billing}</p>
                </div>
              </div>
            </div>
            <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
          </button>
        ))}

        {/* Status Circle */}
        <div className="absolute bg-[#1d1d1d] left-[1433px] rounded-[93.5px] size-[187px] top-[41px] cursor-pointer" onClick={handleAction}>
          <div className="flex flex-col items-center justify-center relative size-full">
            <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-[43px] py-[66px] relative size-[187px]">
              <div className="box-border content-stretch flex flex-col gap-4 items-center justify-center p-0 relative shrink-0 w-[100px]">
                <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-center w-full">
                  <p className="block leading-[1.5] whitespace-pre-wrap">{getStatusMessage()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}