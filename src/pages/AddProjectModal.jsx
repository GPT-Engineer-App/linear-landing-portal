import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const AddProjectModal = ({ isOpen, onClose, onSubmit, teamId }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [milestones, setMilestones] = useState([{ title: '', startDate: '', endDate: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName && projectDescription) {
      onSubmit(teamId, { 
        name: projectName, 
        description: projectDescription, 
        issues: [], 
        documents: [],
        milestones: milestones.filter(m => m.title && m.startDate && m.endDate)
      });
      setProjectName('');
      setProjectDescription('');
      setMilestones([{ title: '', startDate: '', endDate: '' }]);
      onClose();
    }
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...milestones];
    newMilestones[index][field] = value;
    setMilestones(newMilestones);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { title: '', startDate: '', endDate: '' }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>
            <div>
              <Label htmlFor="projectDescription">Project Description</Label>
              <Input
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter project description"
                required
              />
            </div>
            <div>
              <Label>Milestones</Label>
              {milestones.map((milestone, index) => (
                <div key={index} className="space-y-2 mt-2">
                  <Input
                    placeholder="Milestone title"
                    value={milestone.title}
                    onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Input
                      type="date"
                      value={milestone.startDate}
                      onChange={(e) => handleMilestoneChange(index, 'startDate', e.target.value)}
                    />
                    <Input
                      type="date"
                      value={milestone.endDate}
                      onChange={(e) => handleMilestoneChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" className="mt-2" onClick={addMilestone}>
                Add Milestone
              </Button>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
