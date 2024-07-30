import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Plus, Pencil, Trash2, FileText, CheckCircle, Clock } from "lucide-react";

const Project = () => {
  const { id } = useParams();
  const [issues, setIssues] = useState([
    { id: 1, title: 'Fix login bug', description: 'Users unable to log in on Safari', status: 'In Progress' },
    { id: 2, title: 'Implement dark mode', description: 'Add dark mode option to settings', status: 'To Do' },
  ]);
  const [isAddIssueModalOpen, setIsAddIssueModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);
  const [newIssue, setNewIssue] = useState({ title: '', description: '', status: 'To Do' });

  const handleAddIssue = () => {
    setIssues([...issues, { ...newIssue, id: Date.now() }]);
    setNewIssue({ title: '', description: '', status: 'To Do' });
    setIsAddIssueModalOpen(false);
  };

  const handleEditIssue = () => {
    setIssues(issues.map(issue => issue.id === editingIssue.id ? editingIssue : issue));
    setEditingIssue(null);
  };

  const handleDeleteIssue = (id) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileText className="mr-2 h-8 w-8" />
        Project {id}
      </h1>
      
      <Dialog open={isAddIssueModalOpen} onOpenChange={setIsAddIssueModalOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Add New Issue
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Issue</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newIssue.title}
                onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
                placeholder="Enter issue title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newIssue.description}
                onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                placeholder="Enter issue description"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={newIssue.status}
                onValueChange={(value) => setNewIssue({...newIssue, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddIssue}>Add Issue</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {issues.map((issue) => (
          <Card key={issue.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="mr-2" />
                  {issue.title}
                </div>
                <div>
                  <Button variant="ghost" size="icon" onClick={() => setEditingIssue(issue)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteIssue(issue.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{issue.description}</p>
              <div className="text-sm font-semibold flex items-center">
                {issue.status === 'To Do' && <Clock className="mr-1 h-4 w-4 text-yellow-500" />}
                {issue.status === 'In Progress' && <AlertCircle className="mr-1 h-4 w-4 text-blue-500" />}
                {issue.status === 'Done' && <CheckCircle className="mr-1 h-4 w-4 text-green-500" />}
                {issue.status}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingIssue && (
        <Dialog open={!!editingIssue} onOpenChange={() => setEditingIssue(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Issue</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editTitle">Title</Label>
                <Input
                  id="editTitle"
                  value={editingIssue.title}
                  onChange={(e) => setEditingIssue({...editingIssue, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editDescription">Description</Label>
                <Input
                  id="editDescription"
                  value={editingIssue.description}
                  onChange={(e) => setEditingIssue({...editingIssue, description: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editStatus">Status</Label>
                <Select
                  value={editingIssue.status}
                  onValueChange={(value) => setEditingIssue({...editingIssue, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleEditIssue}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Project;
