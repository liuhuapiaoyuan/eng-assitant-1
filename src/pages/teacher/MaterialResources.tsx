import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Book, ChevronRight, Folder, FolderOpen, PlayCircle, PlusCircle, Search, FileText, Image as ImageIcon } from "lucide-react";
import { materialDirectory as initialMaterialDirectory, materialContent } from "../../mock/materials";

export default function MaterialResources() {
  const [materialDirectory, setMaterialDirectory] = useState(initialMaterialDirectory);

  const toggleGrade = (gradeIndex: number) => {
    const newDir = [...materialDirectory];
    newDir[gradeIndex].isOpen = !newDir[gradeIndex].isOpen;
    setMaterialDirectory(newDir);
  };

  const toggleUnit = (gradeIndex: number, unitIndex: number) => {
    const newDir = [...materialDirectory];
    newDir[gradeIndex].units[unitIndex].isOpen = !newDir[gradeIndex].units[unitIndex].isOpen;
    setMaterialDirectory(newDir);
  };

  const toggleTopic = (gradeIndex: number, unitIndex: number, topicIndex: number) => {
    const newDir = [...materialDirectory];
    newDir[gradeIndex].units[unitIndex].topics[topicIndex].isOpen = !newDir[gradeIndex].units[unitIndex].topics[topicIndex].isOpen;
    setMaterialDirectory(newDir);
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-8rem)] gap-6">
      {/* Sidebar: Tree Directory */}
      <div className="w-full lg:w-72 shrink-0 bg-white border border-slate-200 rounded-xl flex flex-col shadow-sm h-64 lg:h-auto hidden lg:flex">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-slate-800">教材目录</h2>
          <div className="mt-3 relative">
            <Search className="w-4 h-4 absolute left-2 top-2.5 text-slate-400" />
            <Input placeholder="搜索单元或话题..." className="pl-8 h-9 text-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {materialDirectory.map((grade, gradeIndex) => (
              <div key={gradeIndex}>
                <div onClick={() => toggleGrade(gradeIndex)} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 cursor-pointer rounded text-slate-700">
                  <ChevronRight className={`w-4 h-4 transition-transform ${grade.isOpen ? 'rotate-90' : ''}`} />
                  {grade.isOpen ? <FolderOpen className="w-4 h-4 text-indigo-500" /> : <Folder className="w-4 h-4 text-slate-400" />}
                  <span className="text-sm font-medium">{grade.title}</span>
                </div>
                
                {grade.isOpen && (
                  <div className="ml-6 space-y-1">
                    {grade.units.map((unit, unitIndex) => (
                      <div key={unitIndex}>
                        <div onClick={() => toggleUnit(gradeIndex, unitIndex)} className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded ${unit.isOpen ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}>
                          <ChevronRight className={`w-4 h-4 transition-transform ${unit.isOpen ? 'rotate-90' : ''}`} />
                          {unit.isOpen ? <FolderOpen className="w-4 h-4 text-indigo-500" /> : <Folder className="w-4 h-4 text-slate-400" />}
                          <span className={`text-sm ${unit.isOpen ? 'font-bold' : 'font-medium'}`}>{unit.title}</span>
                        </div>
                        
                        {unit.isOpen && (
                          <div className="ml-6 space-y-1">
                            {unit.topics.map((topic, topicIndex) => (
                              <div key={topicIndex}>
                                <div onClick={() => toggleTopic(gradeIndex, unitIndex, topicIndex)} className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded ${topic.isOpen ? 'hover:bg-slate-50 text-slate-700' : 'hover:bg-slate-50 text-slate-700'}`}>
                                  <ChevronRight className={`w-4 h-4 transition-transform ${topic.isOpen ? 'rotate-90' : ''}`} />
                                  {topic.isOpen ? <FolderOpen className="w-4 h-4 text-indigo-500" /> : <Folder className="w-4 h-4 text-slate-400" />}
                                  <span className="text-sm font-medium">{topic.title}</span>
                                </div>
                                
                                {topic.isOpen && (
                                  <div className="ml-6 space-y-1">
                                    {topic.sections.map((section, sectionIndex) => (
                                      <div key={sectionIndex} className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded ${section.active ? 'bg-indigo-600 text-white shadow-sm flex-1 py-1' : 'hover:bg-slate-50 text-slate-600'}`}>
                                        <FileText className="w-4 h-4" />
                                        <span className={`text-sm ${section.active ? 'font-medium' : ''}`}>{section.title}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span>七年级上册</span> <ChevronRight className="w-3 h-3" />
              <span>Unit 1</span> <ChevronRight className="w-3 h-3" />
              <span>Topic 1</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Section A</h1>
            <p className="text-slate-500 mt-1">教学内容：问候与介绍</p>
          </div>
          <Button className="bg-slate-900 text-white">
            <PlusCircle className="w-4 h-4 mr-2"/> 加入备课夹
          </Button>
        </div>

        <div className="flex-1 overflow-auto bg-slate-50/50 p-6">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="bg-white border shadow-sm mb-6 flex flex-wrap w-full h-auto justify-start gap-1 p-1">
              <TabsTrigger value="text">课文资源</TabsTrigger>
              <TabsTrigger value="vocab">词汇库 ({materialContent.vocab.length})</TabsTrigger>
              <TabsTrigger value="grammar">语法解析</TabsTrigger>
              <TabsTrigger value="exercises">配套习题</TabsTrigger>
              <TabsTrigger value="materials">教学素材</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4 m-0">
              <Card>
                <CardHeader className="bg-slate-50 border-b pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">1a Look, listen and say</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><PlayCircle className="w-4 h-4 mr-2"/> 播放课文录音</Button>
                      <Button variant="outline" size="sm">下载课件源文件</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-slate-800 text-lg leading-loose font-medium">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-4">
                      {materialContent.textResource.map((line, idx) => (
                        <div key={idx}>
                          <p>{line.speaker}: {line.english}</p>
                          <p className="text-slate-500 text-base font-normal">{line.chinese}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vocab" className="m-0">
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                 {materialContent.vocab.map((item, i) => (
                   <div key={i} className="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center group hover:border-indigo-300">
                     <div>
                       <div className="font-bold text-lg text-slate-800">{item.word} <span className="text-slate-400 font-normal text-sm ml-1">{item.phonetic}</span></div>
                       <div className="text-slate-500 text-sm mt-1">{item.chinese}</div>
                     </div>
                     <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                       <PlayCircle className="w-4 h-4 text-indigo-500"/>
                     </Button>
                   </div>
                 ))}
               </div>
            </TabsContent>

            <TabsContent value="materials" className="m-0">
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                 {materialContent.materials.map((mat, i) => (
                   <Card key={i} className="overflow-hidden">
                     {mat.type === 'image' ? (
                       <div className="h-32 bg-slate-100 flex items-center justify-center">
                         <ImageIcon className="w-8 h-8 text-slate-400" />
                       </div>
                     ) : (
                       <div className="h-32 bg-slate-100 flex flex-col gap-2 items-center justify-center bg-indigo-50 text-indigo-500">
                         <PlayCircle className="w-8 h-8" />
                         <span className="text-xs font-medium">{mat.filename}</span>
                       </div>
                     )}
                     <CardContent className="p-3">
                       <h4 className="font-medium text-sm">{mat.title}</h4>
                     </CardContent>
                   </Card>
                 ))}
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
