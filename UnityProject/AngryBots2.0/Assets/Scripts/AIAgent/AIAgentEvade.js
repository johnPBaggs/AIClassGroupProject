#pragma strict

public class AIAgentEvade extends AIAgentFlee {

	public var maxPrediction : float;
	public var targetAux : GameObject;
	public var targetAgent : float = 3.0;
	
	/*public function AIAgentFlee(aiAgent : GameObject, target : GameObject) {
		//super(aiAgent, target);
		//targetAgent = targetAux.GetComponent.<Agent>();
//		targetAux = this.target;
		target = new GameObject();
	}
	
	public override function GetSteering() : AIAgentSteering {
		var direction : Vector3 = targetAux.transform.position - aiAgent.transform.position;
		var distance : float = direction.magnitude;
		var speed : float = this.walkingSpeed;
		var prediction : float;
		if(speed <= distance / maxPrediction) {
			prediction = maxPrediction;
		} else {
			prediction = distance / speed;
		}
		target.transform.position = targetAux.transform.position;
		target.transform.position += targetAgent * prediction;
		return super.GetSteering();
	}
	
	function OnDestroy() {
		Destroy(targetAux);
	}*/
}

