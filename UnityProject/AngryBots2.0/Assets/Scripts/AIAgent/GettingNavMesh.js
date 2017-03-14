#pragma strict

import System.IO;

public class GettingNavMesh extends MonoBehaviour {
	
	public var navMesh : Mesh;

	public var polygons : AIPolygon[];
	public var polygonCount : int = 0;
	
 
	public function Start () {
		navMesh = new Mesh();
  	  try {
  	      // Create an instance of StreamReader to read from a file.
  	       var sr = new StreamReader("/Volumes/2TB/AIClassGroupProject/UnityProject/AngryBots2.0/Assets/AngryBotsExportedNavMesh.obj");
  	      // Read and display lines from the file until the end of the file is reached.
  	      var line : String = sr.ReadLine();
  	      line = sr.ReadLine();
  	      var count : int = 0;
  	      count = int.Parse(line);
  	      var vectors : Vector3[] = new Vector3[count];
	  	  for(var counter : int = 0; counter < count; counter++)
	  	  {
	  	  		vectors[counter] = new Vector3();
	  	  		line = sr.ReadLine();
	  	  		var substring : String[] = line.Split(" "[0]);
	  	  		vectors[counter].x = double.Parse(substring[1]);
	  	  		vectors[counter].y = double.Parse(substring[2]);
	  	  		vectors[counter].z = double.Parse(substring[3]);
	  	  }
	  	navMesh.vertices = vectors;
		line = sr.ReadLine();
			count = int.Parse(line);
			if(count != 0) {
				var vectorNormals : Vector3[] = new Vector3[count];
				for(var counter2 : int = 0; counter < count; counter++) {
					vectorNormals[counter] = new Vector3();
					line = sr.ReadLine();
					var substring2 : String[] = line.Split(" "[0]);
					vectorNormals[counter].x = double.Parse(substring2[1]);
		  	  		vectorNormals[counter].y = double.Parse(substring2[2]);
		  	  		vectorNormals[counter].z = double.Parse(substring2[3]);
				}
				navMesh.normals = vectorNormals;
			}
			line = sr.ReadLine();
			count = int.Parse(line);
			if(count != 0)
			{
				var vectorUvs : Vector2[] = new Vector2[count];
				for(var counter3 : int = 0; counter < count; counter++) {
					vectorUvs[counter] = new Vector2();
					line = sr.ReadLine();
					var substring3 : String[] = line.Split(" "[0]);
					vectorUvs[counter].x = double.Parse(substring3[1]);
	  	  			vectorUvs[counter].y = double.Parse(substring3[2]);
				}
				navMesh.uv = vectorUvs;
			}
			line = sr.ReadLine();
			count = int.Parse(line);
			for (var materialCount : int = 0; materialCount < count; materialCount++) {
				line = sr.ReadLine();
				var secondCount : int = int.Parse(line);
				var triangles : int[] = new int[secondCount];
				for (var triangleCount : int = 0; triangleCount < secondCount; triangleCount+=3) {
					line = sr.ReadLine();
					var substring4 : String[] = line.Split(" "[0]);
					triangles[triangleCount] = int.Parse(substring4[1].Split("/"[0])[0]) - 1; 
					triangles[triangleCount + 1] = int.Parse(substring4[2].Split("/"[0])[0]) - 1;
					triangles[triangleCount + 2] = int.Parse(substring4[3].Split("/"[0])[0]) - 1;  
				}
				navMesh.triangles = triangles;
			}
	        sr.Close();
	    }
	    catch (e) {
	        // Let the user know what went wrong.
	        print("The file could not be read:");
	        print(e.Message);
	    }

 		navMesh.RecalculateBounds();
 		enabled = false;
 		polygons = new AIPolygon[navMesh.triangles.length/3];
 		polygonCount = navMesh.triangles.length/3;
 		var vectorArray : Vector3[] = navMesh.vertices;
 		var WorldPositionArray : Vector3[] = new Vector3[3];
 		var count1 : int = 0;
		var count2 : int = 1;
		var count3 : int = 2;
		var triangleArray : int[] = navMesh.GetTriangles (0);
		//var counter : int = 0;
		for (var counter6 : int = 0; count1 < triangleArray.Length; counter6++) {
			polygons[counter6] = new AIPolygon();
			WorldPositionArray [0] = vectorArray [triangleArray [count1]];
			WorldPositionArray [1] = vectorArray [triangleArray [count2]];
			WorldPositionArray [2] = vectorArray [triangleArray [count3]];
			polygons[counter6].setTriangle(WorldPositionArray [0], WorldPositionArray [1], WorldPositionArray [2]);
			count1 += 3;
			 count2 += 3;
			  count3 += 3; 
		}
	}


	function OnDrawGizmos () {
		Gizmos.color = Color.yellow;
		for(var count : int = 0; count < polygonCount; count++)
			polygons[count].drawSelf(Gizmos.color);
		
	}

	function OnBecameVisible () {
		enabled = true;	
	}

	function OnBecameInvisible () {
		enabled = false;
	}

}

/*
using System.IO;
using System.Text;
using UnityEditor;
using UnityEngine;
 
// Obj exporter component based on: http://wiki.unity3d.com/index.php?title=ObjExporter
 
public class ExportNavMeshToObj : MonoBehaviour {
 
    [MenuItem("Custom/Export NavMesh to mesh")]
    static void Export() {
        NavMeshTriangulation triangulatedNavMesh = NavMesh.CalculateTriangulation();
 
        Mesh mesh = new Mesh();
        mesh.name = "ExportedNavMesh";
        mesh.vertices = triangulatedNavMesh.vertices;
        mesh.triangles = triangulatedNavMesh.indices;
        string filename = Application.dataPath +"/" + Path.GetFileNameWithoutExtension(EditorApplication.currentScene) + " Exported NavMesh.obj";
        MeshToFile(mesh, filename);
        print("NavMesh exported as '" + filename + "'");
        AssetDatabase.Refresh();
    }
 
    static string MeshToString(Mesh mesh) {
        StringBuilder sb = new StringBuilder();
 
        sb.Append("g ").Append(mesh.name).Append("\n");
        foreach (Vector3 v in mesh.vertices) {
            sb.Append(string.Format("v {0} {1} {2}\n",v.x,v.y,v.z));
        }
        sb.Append("\n");
        foreach (Vector3 v in mesh.normals) {
            sb.Append(string.Format("vn {0} {1} {2}\n",v.x,v.y,v.z));
        }
        sb.Append("\n");
        foreach (Vector3 v in mesh.uv) {
            sb.Append(string.Format("vt {0} {1}\n",v.x,v.y));
        }
        for (int material = 0; material < mesh.subMeshCount; material++) {
            sb.Append("\n");
            //sb.Append("usemtl ").Append(mats[material].name).Append("\n");
            //sb.Append("usemap ").Append(mats[material].name).Append("\n");
 
            int[] triangles = mesh.GetTriangles(material);
            for (int i=0;i<triangles.Length;i+=3) {
                sb.Append(string.Format("f {0}/{0}/{0} {1}/{1}/{1} {2}/{2}/{2}\n", triangles[i]+1, triangles[i+1]+1, triangles[i+2]+1));
            }
        }
        return sb.ToString();
    }
 
    static void MeshToFile(Mesh mesh, string filename) {
        using (StreamWriter sw = new StreamWriter(filename)) {
            sw.Write(MeshToString(mesh));
        }
    }
}*/