import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Plus, Pencil, Trash2, FileText, CheckCircle, Clock, Home, File } from "lucide-react";

const Project = () => {
  const { id } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [issues, setIssues] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch project details from the state passed through navigation
    if (location.state && location.state.project) {
      setProject(location.state.project);
    } else {
      // If project details are not available in state, you might want to fetch them from an API
      // For now, we'll set a placeholder
      setProject({ name: `Project ${id}`, description: 'Project description' });
    }
  }, [id, location]);
  const [isAddIssueModalOpen, setIsAddIssueModalOpen] = useState(false);
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);
  const [newIssue, setNewIssue] = useState({ title: '', description: '', status: 'To Do' });
  const [newDocument, setNewDocument] = useState({ name: '', url: '' });

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
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <FileText className="mr-2 h-8 w-8" />
          {project ? project.name : 'Loading...'}
        </h1>
        <Button asChild variant="outline">
          <Link to="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </nav>
      
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
