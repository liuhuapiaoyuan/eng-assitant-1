import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenTool, Clock, CheckCircle2, AlertCircle, FileText, SpellCheck, Link as LinkIcon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

import { assignments } from '../../mock/assignments';
export default function AssignmentCenter() {
  

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "grammar": return <FileText className="w-4 h-4" />;
      case "dictation": return <SpellCheck className="w-4 h-4" />;
      case "essay": return <PenTool className="w-4 h-4" />;
      case "translation": return <LinkIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo": 
        return <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none">未完成</Badge>;
      case "submitted": 
        return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none">批改中</Badge>;
      case "graded": 
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">已批改</Badge>;
      case "correction_needed": 
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">需订正</Badge>;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">作业中心</h1>
          <p className="text-slate-500 mt-1">你有 <span className="text-red-500 font-bold">1</span> 项作业待完成，<span className="text-red-500 font-bold">1</span> 项需要订正。</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="搜索作业..." className="pl-9 bg-slate-50 border-none" />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white border border-slate-100 p-1 rounded-lg h-auto mb-6 flex flex-wrap w-full justify-start gap-1">
          <TabsTrigger value="all" className="px-6 py-2 rounded-md data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">全部作业</TabsTrigger>
          <TabsTrigger value="todo" className="px-6 py-2 rounded-md data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">待完成 (1)</TabsTrigger>
          <TabsTrigger value="correction" className="px-6 py-2 rounded-md data-[state=active]:bg-red-50 data-[state=active]:text-red-700 relative">
            需订正 (1)
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </TabsTrigger>
          <TabsTrigger value="history" className="px-6 py-2 rounded-md data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">历史作业</TabsTrigger>
        </TabsList>

        {['all', 'todo', 'correction', 'history'].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments
                .filter(task => {
                  if (tabValue === 'todo') return task.status === 'todo';
                  if (tabValue === 'correction') return task.status === 'correction_needed';
                  if (tabValue === 'history') return task.status === 'submitted' || task.status === 'graded';
                  return true;
                })
                .map((task) => (
                <Card key={task.id} className={`transition-shadow hover:shadow-md ${task.status === 'correction_needed' ? 'ring-1 ring-red-400' : ''}`}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                         <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600">
                           {getTypeIcon(task.type)}
                         </span>
                         <Badge variant="outline" className="text-slate-500 border-slate-200">{task.typeLabel}</Badge>
                      </div>
                      {getStatusBadge(task.status)}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1 mb-2">{task.title}</h3>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span className={task.status === 'todo' ? 'text-red-600 font-medium' : ''}>{task.deadline}</span>
                      </div>
                      
                      {task.score && (
                        <div className="font-bold text-lg text-slate-700">
                          {task.score}
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                      {task.status === 'todo' && (
                        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                          <Link to={task.type === 'essay' ? "/student/essay" : "/student/"}>去完成</Link>
                        </Button>
                      )}
                      {task.status === 'correction_needed' && (
                        <Button variant="destructive" asChild>
                          <Link to={task.type === 'dictation' ? "/student/speaking" : "/student/"}>立即订正</Link>
                        </Button>
                      )}
                      {task.status === 'graded' && (
                        <Button variant="outline" asChild className="text-slate-600 border-slate-200">
                          <Link to="/student/essay">查看批改</Link>
                        </Button>
                      )}
                      {task.status === 'submitted' && (
                        <Button variant="ghost" disabled className="text-slate-400">
                          提交成功，等待批改...
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
