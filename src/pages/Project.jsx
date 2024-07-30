import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Plus, Pencil, Trash2, FileText, CheckCircle, Clock, Home, File, Flag } from "lucide-react";
import Timeline from './Timeline';

const Project = () => {
  const { id } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(location.state?.project || null);
  const [issues, setIssues] = useState(project?.issues || []);
  const [documents, setDocuments] = useState(project?.documents || []);
  const [milestones, setMilestones] = useState(project?.milestones || []);
  const [isAddIssueModalOpen, setIsAddIssueModalOpen] = useState(false);
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [isAddMilestoneModalOpen, setIsAddMilestoneModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);
  const [newIssue, setNewIssue] = useState({ title: '', description: '', status: 'To Do' });
  const [newDocument, setNewDocument] = useState({ name: '', url: '' });
  const [newMilestone, setNewMilestone] = useState({ title: '', startDate: '', endDate: '' });

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

  const showIssues = location.state?.showIssues || true;
  const showOverview = location.state?.showOverview || true;

  return (
    <div className="container mx-auto p-6">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <FileText className="mr-2 h-8 w-8" />
          {project ? project.name : 'Loading...'}
        </h1>
        <div className="space-x-2">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </nav>
      
      {showOverview && (
        <>
          <Timeline milestones={milestones} />
          
          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
            <Flag className="mr-2 h-6 w-6" />
            Milestones
          </h2>
          
          <Button className="mb-4" onClick={() => setIsAddMilestoneModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Milestone
          </Button>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
            <File className="mr-2 h-6 w-6" />
            Documents
          </h2>
          
          <Button className="mb-4" onClick={() => setIsAddDocumentModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Document
          </Button>
          
          <div className="space-y-4">
            {documents.map((document) => (
              <Card key={document.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <File className="mr-2 h-4 w-4" />
                      {document.name}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setDocuments(documents.filter(doc => doc.id !== document.id));
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href={document.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Document
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
      
      {showIssues && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <AlertCircle className="mr-2 h-6 w-6" />
            Issues
          </h2>
          <Button className="mb-4" onClick={() => setIsAddIssueModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Issue
          </Button>
          <div className="space-y-4">
            {issues.map((issue) => (
              <Card key={issue.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
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
          <Button className="mt-4" onClick={() => setIsAddIssueModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Issue
          </Button>
        </div>
      )}
      
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

      <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
        <Flag className="mr-2 h-6 w-6" />
        Milestones
      </h2>

      <Dialog open={isAddMilestoneModalOpen} onOpenChange={setIsAddMilestoneModalOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Add New Milestone
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Milestone</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="milestoneTitle">Milestone Title</Label>
              <Input
                id="milestoneTitle"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                placeholder="Enter milestone title"
              />
            </div>
            <div>
              <Label htmlFor="milestoneStartDate">Start Date</Label>
              <Input
                id="milestoneStartDate"
                type="date"
                value={newMilestone.startDate}
                onChange={(e) => setNewMilestone({...newMilestone, startDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="milestoneEndDate">End Date</Label>
              <Input
                id="milestoneEndDate"
                type="date"
                value={newMilestone.endDate}
                onChange={(e) => setNewMilestone({...newMilestone, endDate: e.target.value})}
                min={newMilestone.startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
            <Button onClick={() => {
              setMilestones([...milestones, { ...newMilestone, id: Date.now() }]);
              setNewMilestone({ title: '', startDate: '', endDate: '' });
              setIsAddMilestoneModalOpen(false);
            }}>Add Milestone</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Timeline milestones={milestones} />

      <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
        <File className="mr-2 h-6 w-6" />
        Documents
      </h2>

      <Dialog open={isAddDocumentModalOpen} onOpenChange={setIsAddDocumentModalOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Add New Document
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="documentName">Document Name</Label>
              <Input
                id="documentName"
                value={newDocument.name}
                onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                placeholder="Enter document name"
              />
            </div>
            <div>
              <Label htmlFor="documentUrl">Document URL</Label>
              <Input
                id="documentUrl"
                value={newDocument.url}
                onChange={(e) => setNewDocument({...newDocument, url: e.target.value})}
                placeholder="Enter document URL"
              />
            </div>
            <Button onClick={() => {
              setDocuments([...documents, { ...newDocument, id: Date.now() }]);
              setNewDocument({ name: '', url: '' });
              setIsAddDocumentModalOpen(false);
            }}>Add Document</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {documents.map((document) => (
          <Card key={document.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <File className="mr-2 h-4 w-4" />
                  {document.name}
                </div>
                <Button variant="ghost" size="icon" onClick={() => {
                  setDocuments(documents.filter(doc => doc.id !== document.id));
                }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href={document.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View Document
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Project;
