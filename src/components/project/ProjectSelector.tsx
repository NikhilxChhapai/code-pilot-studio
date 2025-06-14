
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Folder, Github, Search, Plus, Settings, Upload, FolderOpen, GitBranch } from 'lucide-react';

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
    <div className="p-4 md:p-6 h-full overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage your development projects and workspaces.
          </p>
        </div>

        {/* Search and Actions - Responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <FolderOpen className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Open Folder</span>
              <span className="sm:hidden">Folder</span>
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Github className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Clone from GitHub</span>
              <span className="sm:hidden">GitHub</span>
            </Button>
            <Button className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">New Project</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        </div>

        {/* Quick Actions - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 md:mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 hover:scale-105">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[140px]">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Create New Project</h3>
              <p className="text-sm text-muted-foreground">Start with a template or from scratch</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 hover:scale-105">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[140px]">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                <FolderOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Open Local Project</h3>
              <p className="text-sm text-muted-foreground">Browse and select existing project folder</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 hover:scale-105 md:col-span-2 lg:col-span-1">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[140px]">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <Github className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Clone from GitHub</h3>
              <p className="text-sm text-muted-foreground">Import repository from GitHub or Git URL</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockProjects.map((project) => (
              <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Folder className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                        <CardDescription className="text-sm truncate">{project.path}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'} className="ml-2">
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">{project.type}</Badge>
                      <span className="text-xs text-muted-foreground">{project.lastModified}</span>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <GitBranch className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
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
