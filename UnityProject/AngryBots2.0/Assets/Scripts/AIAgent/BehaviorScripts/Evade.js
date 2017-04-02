#pragma strict

public class Evade extends Flee {

	public var maxPrediction : float;
	public var targetAux : GameObject;
	public var targetAgent : Agent;
	
	public override function Awake() {
		super.Awake();
		targetAgent = targetAux.GetComponent.<Agent>();
		targetAux = target;
		target = new GameObject();
	}
	
	public override function GetSteering() : Steering {
		var direction : Vector3 = targetAux.transform.position - transform.position;
		var distance : float = direction.magnitude;
		var speed : float = agent.velocity.magnitude;
		var prediction : float;
		if(speed <= distance / maxPrediction) {
			prediction = maxPrediction;
		} else {
			prediction = distance / speed;
		}
		target.transform.position = targetAux.transform.position;
		target.transform.position += targetAgent.velocity * prediction;
		return super.GetSteering();
	}
	
	function OnDestroy() {
		Destroy(targetAux);
	}
}

