#pragma strict


public class AIAgentFlee extends MonoBehaviour{

	public var target : Transform;
	//public var aiAgent : AIAgent;
	public var isFleeing : boolean = false;
	
	public var agentBehaviour : AIAgentBehaviour;
	public var navMeshAgent : NavMeshAgent;
	
	public var navHit : NavMeshHit;
	public var fleeTarget : Transform;
	public var runPosition : Vector3;
	public var directionToEnemy : Vector3;
	public var fleeRange : float = 25;
	public var checkRate : float;
	public var nextCheck : float;
	
	//public var movement : MoveController;
	public var walkingSpeed : float = 5.0;
	public var walkingSnappyness : float = 50;
	public var turningSmoothing : float = 0.3;
	

	public function Awake() {
		agentBehaviour = gameObject.GetComponent.<AIAgentBehaviour>();
		navMeshAgent = gameObject.GetComponent.<NavMeshAgent>();
		//aiAgent = gameObject.GetComponent.<AIAgent>();
		checkRate = Random.Range(0.3, 0.4);
	}

	public function Update() {
		//if(Time.time > nextCheck) {
			//nextCheck = Time.time + checkRate;
		if(isFleeing) {
			if(fleeTarget == null) {
				fleeTarget = agentBehaviour.agentCollider.currentTopOfList;
			}
		}
		checkIfIShouldFlee();
		//}
	}
	
	public function GetSteering() : AIAgentSteering {
		
	}
	
	public function setFleeTarget(target : Transform) {
		fleeTarget = target;
	}
	
	public function iShouldFlee () {
		isFleeing = true;
	}
	
	public function iShouldStopFleeing() {
		isFleeing = false;
		navMeshAgent.Stop();
	}
	
	
	function checkIfIShouldFlee() {
		if(isFleeing) {
			if(fleeTarget != null) {
				if(FleeTarget() && Vector3.Distance(transform.position, fleeTarget.position) < fleeRange) {
					Debug.Log("HERERERER");
					navMeshAgent.Resume();
					navMeshAgent.SetDestination(runPosition);
					
				}
			}
		}
	}
	
	function FleeTarget() : boolean {
		directionToEnemy = transform.position - fleeTarget.position;
		var checkPos : Vector3 = transform.position + directionToEnemy;
		
		if (NavMesh.SamplePosition(checkPos, navHit, 5.0f, NavMesh.AllAreas)) { 
			runPosition = navHit.position;
			Debug.Log("true");
			return true;
		} else {
			runPosition = transform.position;
			Debug.Log("false");
			return false;
		}
	}
	
	
}

/*

var steering : AIAgentSteering = new AIAgentSteering();
		steering.linear = aiAgent.transform.position - target.target.transform.position;
		steering.linear.Normalize();
		steering.linear = steering.linear * walkingSpeed;
		return steering;
		*/

