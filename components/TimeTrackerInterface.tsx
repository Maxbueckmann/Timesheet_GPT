import { useState, useMemo, useEffect } from "react";
import type { SelectionState } from "../types";
import { AppleStylePicker } from "./AppleStylePicker";
import { HorizontalSelectionContainer } from "./HorizontalSelectionContainer";
import { SelectedOption } from "./SelectedOption";
import { StatusCircle } from "./StatusCircle";
import { cn } from "./ui/utils";

// Mock data for the different categories
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
  activity: mockData.activities[0],
};

export function TimeTrackerInterface() {
  const [selections, setSelections] = useState<SelectionState>(initialSelections);
  const [comment, setComment] = useState('');

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

  // Automatically select the first option when a column becomes visible
  useEffect(() => {
    if (visibleColumns.includes('customer') && selections.activity === 'Customer' && !selections.customer) {
      handleSelection('customer', mockData.customers[0]);
    }
    if (visibleColumns.includes('project') && selections.customer && !selections.project) {
      const customerProjects = mockData.projects[selections.customer as keyof typeof mockData.projects] || [];
      if (customerProjects.length > 0) {
        handleSelection('project', customerProjects[0]);
      }
    }
    if (visibleColumns.includes('role') && selections.project && !selections.role) {
      handleSelection('role', mockData.roles[0]);
    }
    if (visibleColumns.includes('billing') && selections.role && !selections.billing) {
      handleSelection('billing', mockData.billingOptions[0]);
    }
    if (visibleColumns.includes('internalCategory') && selections.activity === 'Internal' && !selections.internalCategory) {
      handleSelection('internalCategory', mockData.internalCategories[0]);
    }
    if (visibleColumns.includes('absenceType') && selections.activity === 'Absence' && !selections.absenceType) {
      handleSelection('absenceType', mockData.absenceTypes[0]);
    }
  }, [visibleColumns]);

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

  const handleCommentChange = (value: string) => {
    setComment(value);
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
    if (!selections.activity) {
      return "Aufforderung zur Auswahl";
    }
    if (selections.activity === 'Customer' && !selections.customer) {
      return "Wähle einen Kunden";
    }
    if (selections.activity === 'Customer' && !selections.project) {
      return "Projekt auswählen";
    }
    if (selections.activity === 'Customer' && !selections.role) {
      return "Rolle definieren";
    }
    if (selections.activity === 'Customer' && !selections.billing) {
      return "Abrechenbar?";
    }
    if (selections.activity === 'Internal' && !selections.internalCategory) {
      return "Kategorie wählen";
    }
    if (selections.activity === 'Absence' && !selections.absenceType) {
      return "Abwesenheitstyp";
    }
    if (visibleColumns.includes('comment') && !comment.trim()) {
      return "Was machst du?";
    }
    if (selections.activity === 'Absence' && isComplete) {
      return "Eintrag abschicken";
    }
    if (isComplete) {
      return "Timer starten";
    }
    return "Auswahl fortsetzen";
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

  const renderPicker = (column: string) => {
    switch (column) {
      case 'activity':
        return (
          <AppleStylePicker
            key={column}
            options={mockData.activities}
            selected={selections.activity}
            onSelect={(value) => handleSelection('activity', value)}
          />
        );
      
      case 'customer':
        return (
          <AppleStylePicker
            key={column}
            options={mockData.customers}
            selected={selections.customer}
            onSelect={(value) => handleSelection('customer', value)}
          />
        );
      
      case 'project':
        const customerProjects = selections.customer ? mockData.projects[selections.customer as keyof typeof mockData.projects] || [] : [];
        return (
          <AppleStylePicker
            key={column}
            options={customerProjects}
            selected={selections.project}
            onSelect={(value) => handleSelection('project', value)}
          />
        );
      
      case 'role':
        return (
          <AppleStylePicker
            key={column}
            options={mockData.roles}
            selected={selections.role}
            onSelect={(value) => handleSelection('role', value)}
          />
        );
      
      case 'billing':
        return (
          <AppleStylePicker
            key={column}
            options={mockData.billingOptions}
            selected={selections.billing}
            onSelect={(value) => handleSelection('billing', value)}
          />
        );
      
      case 'internalCategory':
        return (
          <AppleStylePicker
            key={column}
            options={mockData.internalCategories}
            selected={selections.internalCategory}
            onSelect={(value) => handleSelection('internalCategory', value)}
          />
        );
      
      case 'absenceType':
        return (
          <AppleStylePicker
            key={column}
            options={mockData.absenceTypes}
            selected={selections.absenceType}
            onSelect={(value) => handleSelection('absenceType', value)}
          />
        );
      
      default:
        return null;
    }
  };

  const renderSelectedOptions = () => {
    const selectedOptions = [];
    
    visibleColumns.forEach((column) => {
      if (selections[column]) {
        selectedOptions.push(
          <SelectedOption 
            key={column}
            value={selections[column]} 
          />
        );
      }
    });

    // Add comment if it's in visible columns and has content
    if (visibleColumns.includes('comment') && comment.trim()) {
      selectedOptions.push(
        <SelectedOption 
          key="comment"
          value={comment}
          isComment={true}
        />
      );
    }

    return selectedOptions;
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black text-white py-8 px-4 overflow-hidden">
      {/* Selected options */}
      <HorizontalSelectionContainer className="mb-10">
        {renderSelectedOptions()}
      </HorizontalSelectionContainer>

      <div className="flex w-full justify-center gap-8 overflow-x-auto">
        {visibleColumns.map((column) => (
          column === 'comment' ? (
            <input
              key={column}
              type="text"
              value={comment}
              onChange={(e) => handleCommentChange(e.target.value)}
              placeholder="attended Meeting XYZ"
              className="w-[219px] h-[63px] bg-transparent border-[0.5px] border-[rgba(255,255,255,0.5)] rounded-lg p-[10px] text-[11px] text-[rgba(255,255,255,0.5)] font-light transition-all"
            />
          ) : (
            <div key={column} className="max-h-[240px] overflow-y-auto">
              {renderPicker(column)}
            </div>
          )
        ))}

        <div className="ml-6 flex-shrink-0">
          <StatusCircle
            status={getStatusType()}
            message={getStatusMessage()}
            canProceed={true}
            onClick={handleAction}
          />
        </div>
      </div>
    </div>
  );
}