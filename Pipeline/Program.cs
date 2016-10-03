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

        public static void Main(string[] args)
        {
            XElement masterXml = XElement.Parse(File.ReadAllText(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\goldenBoard.svg"));

            XElement masterXmlRootDefs = masterXml.Descendants().Where(d => d.Attributes().Where(a => a.Name == "id" && a.Value == "rootDefs").Count() > 0).First();
            XElement masterXmlRootGroup = masterXml.Descendants().Where(d => d.Attributes().Where(a => a.Name == "id" && a.Value == "rootGroup").Count() > 0).First();

            //XElement.Parse("<defs></defs><g id=\"root\"></g>");

            FileInfo destinationSvgHtmlInput = new FileInfo(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\_index.html");
            FileInfo destinationSvgHtml = new FileInfo(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\index.html");
            FileInfo destinationSvg = new FileInfo(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\index.svg");

            DirectoryInfo directoryInfo = new DirectoryInfo(@"C:\Users\ellis-gowlandn\documents\visual studio 2015\Projects\VP\VP\V2\");

            List<FileInfo> allSvgs = new List<FileInfo>();

            directoryInfo.GetDirectories().ToList().ForEach(di => {
                GetAllFiles(allSvgs, di, "*.svg", "p_*");
            });
            

            List<SvgFile> svgFiles = new List<SvgFile>();
            allSvgs.ForEach(svg => svgFiles.Add(new SvgFile()
            {
                FileInfo = svg,
                Xml = XElement.Parse(File.ReadAllText(svg.FullName))
            }));

            svgFiles.OrderBy(s => s.ZIndex).ToList().ForEach(svgFile => {


                XElement svgDefs = svgFile.Xml.Descendants().Where(d => d.Attributes().Where(a => a.Name == "id" && a.Value == "rootDefs").Count() > 0).First();
                XElement svgGroups = svgFile.Xml.Descendants().Where(d => d.Attributes().Where(a => a.Name == "id" && a.Value == "rootGroup").Count() > 0).First();

                XElement svgDefGroup = XElement.Parse(string.Format("<g name=\"{0} defs\"></g>", svgFile.Name));
                svgDefGroup.Add(svgDefs.Elements());

                XElement svgGroupGroup = XElement.Parse(string.Format("<g name=\"{0}\"></g>", svgFile.Name));
                svgGroupGroup.Add(svgGroups.Elements());

                masterXmlRootDefs.Add(svgDefGroup);
                masterXmlRootGroup.Add(svgGroupGroup);
            });

            string fileContents = File.ReadAllText(destinationSvgHtmlInput.FullName);
            fileContents = fileContents.Replace("<!--##goldenBoard##-->", masterXml.ToString());
            File.WriteAllText(destinationSvgHtml.FullName, fileContents);
            File.WriteAllText(destinationSvg.FullName, masterXml.ToString());
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
