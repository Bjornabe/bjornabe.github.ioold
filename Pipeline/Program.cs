using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace Pipeline
{
    class Program
    {
        public class SvgFile
        {
            public int ZIndex
            {
                get
                {
                    int startIndex = FileInfo.Directory.Name.IndexOf("_");
                    int endIndex = FileInfo.Directory.Name.IndexOf(" ");
                    return int.Parse(FileInfo.Directory.Name.Substring(startIndex + 1, endIndex - startIndex));
                }
            }

            public string GroupName
            {
                get
                {
                    int endIndex = FileInfo.Directory.Name.IndexOf(" ");
                    return FileInfo.Directory.Name.Substring(endIndex + 1);
                }
            }

            public string Name
            {
                get
                {
                    return string.Format("{0} {1} {2}", ZIndex, GroupName, FileInfo.Name.Substring(0, FileInfo.Name.Length - FileInfo.Extension.Length));
                }
            }

            public FileInfo FileInfo { get; set; }
            public XElement Xml { get; set; }
        }

        public class Section
        {
            public string SectionPrefix { get; set; }
            public string IndexTokenToReplace { get; set; }
            public FileInfo SvgTemplate { get; set; }
        }

        public static void Main(string[] args)
        {
            FileInfo destinationSvgHtmlInput = new FileInfo(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\_index.html");
            FileInfo destinationSvgHtml = new FileInfo(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\index.html");
            FileInfo destinationSvg = new FileInfo(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\index.svg");


            DirectoryInfo baseDirectory = new DirectoryInfo(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\");


            List<Section> sections = new List<Section>();
            sections.Add(new Section() {
                SectionPrefix = "b_*",
                IndexTokenToReplace = "<!--##goldenBackground##-->",
                SvgTemplate = new FileInfo(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\_goldenBackground.svg")
            });
            sections.Add(new Section()
            {
                SectionPrefix = "p_*",
                IndexTokenToReplace = "<!--##goldenBoard##-->",
                SvgTemplate = new FileInfo(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\_goldenBoard.svg")
            });


            string fileContents = File.ReadAllText(destinationSvgHtmlInput.FullName);
            foreach (Section section in sections)
            {
                XElement containerXml = XElement.Parse(File.ReadAllText(section.SvgTemplate.FullName));
                XElement containerXmlRootDefs = containerXml.Descendants().Where(d => d.Attributes().Where(a => a.Name == "id" && a.Value == "rootDefs").Count() > 0).First();
                XElement containerXmlRootGroup = containerXml.Descendants().Where(d => d.Attributes().Where(a => a.Name == "id" && a.Value == "rootGroup").Count() > 0).First();

                List<FileInfo> allSvgs = new List<FileInfo>();
                ProcessSvgs(baseDirectory, allSvgs, section.SectionPrefix, containerXmlRootDefs, containerXmlRootGroup);

                fileContents = fileContents.Replace(section.IndexTokenToReplace, containerXml.ToString());

                File.WriteAllText(section.SvgTemplate.FullName.Replace("_",""), containerXml.ToString());
            }
            File.WriteAllText(destinationSvgHtml.FullName, fileContents);
        }

        private static void ProcessSvgs(DirectoryInfo directoryInfo, List<FileInfo> allSvgs, string sectionPrefix, XElement containerXmlRootDefs, XElement containerXmlRootGroup)
        {
            directoryInfo.GetDirectories(sectionPrefix).ToList().ForEach(di =>
            {
                GetAllFiles(allSvgs, di, "*.svg", sectionPrefix);
            });

            List<SvgFile> svgFiles = new List<SvgFile>();
            allSvgs.ForEach(svg => svgFiles.Add(new SvgFile()
            {
                FileInfo = svg,
                Xml = XElement.Parse(File.ReadAllText(svg.FullName))
            }));

            svgFiles.OrderBy(s => s.ZIndex).ToList().ForEach(svgFile =>
            {
                XElement svgDefs = svgFile.Xml.Descendants().Where(d => d.Attributes().Where(a => a.Name == "id" && a.Value == "rootDefs").Count() > 0).First();
                XElement svgGroups = svgFile.Xml.Descendants().Where(d => d.Attributes().Where(a => a.Name == "id" && a.Value == "rootGroup").Count() > 0).First();

                XElement svgDefGroup = XElement.Parse(string.Format("<g name=\"{0} defs\"></g>", svgFile.Name));
                svgDefGroup.Add(svgDefs.Elements());

                XElement svgGroupGroup = XElement.Parse(string.Format("<g name=\"{0}\"></g>", svgFile.Name));
                svgGroupGroup.Add(svgGroups.Elements());

                containerXmlRootDefs.Add(svgDefGroup);
                containerXmlRootGroup.Add(svgGroupGroup);
            });
        }

        public static void GetAllFiles(List<FileInfo> list, DirectoryInfo dim, string fileSearchFilter, string directorySearchFilter)
        {
            foreach (var fileInfo in dim.GetFiles(fileSearchFilter))
            {
                list.Add(fileInfo);
            }
            foreach (DirectoryInfo directoryIng in dim.GetDirectories(directorySearchFilter))
            {
                GetAllFiles(list, directoryIng, fileSearchFilter, directorySearchFilter);
            }
        }

        public static void RandomiseGuids(XElement xml)
        {
            List<string> idStrings = new List<string>();

            Regex idRegex = new Regex("id=\"([0-9a-zA-Z]+)\"");
            MatchCollection idMatches = idRegex.Matches(xml.ToString());
            foreach(Match match in idMatches)
            {
                idStrings.Add(match.Groups[1].Value);
            }

            string xmlStringToChange = xml.ToString();

            idStrings.ForEach(idString => {
                string newId = Guid.NewGuid().ToString().Replace("-", "");
                xmlStringToChange = xmlStringToChange.Replace(string.Format("\"{0}\"", idString), newId);
                xmlStringToChange = xmlStringToChange.Replace(string.Format("\"#{0}\"", idString), newId);
            });
        }

    }
}
