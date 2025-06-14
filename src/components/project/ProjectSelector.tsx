
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Folder, Github, Search, Plus, Settings } from 'lucide-react';

export const ProjectSelector = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockProjects = [
    {
      id: '1',
      name: 'my-react-app',
      type: 'React',
      lastModified: '2 hours ago',
      status: 'active',
      path: '/Users/dev/projects/my-react-app'
    },
    {
      id: '2',
      name: 'api-server',
      type: 'Node.js',
      lastModified: '1 day ago',
      status: 'idle',
      path: '/Users/dev/projects/api-server'
    },
    {
      id: '3',
      name: 'dashboard-ui',
      type: 'Next.js',
      lastModified: '3 days ago',
      status: 'idle',
      path: '/Users/dev/projects/dashboard-ui'
    }
  ];

  return (
    <div className="p-6 h-full">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage your development projects and workspaces.</p>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              Clone Repository
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 border-muted-foreground/25 hover:border-primary/50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Plus className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Create New Project</h3>
              <p className="text-sm text-muted-foreground">Start with a template or from scratch</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 border-muted-foreground/25 hover:border-primary/50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Folder className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Open Folder</h3>
              <p className="text-sm text-muted-foreground">Browse and select existing project</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 border-muted-foreground/25 hover:border-primary/50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Github className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Clone Repository</h3>
              <p className="text-sm text-muted-foreground">Import from GitHub or Git URL</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProjects.map((project) => (
              <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Folder className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </div>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>{project.path}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{project.type}</Badge>
                    <span className="text-sm text-muted-foreground">{project.lastModified}</span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
