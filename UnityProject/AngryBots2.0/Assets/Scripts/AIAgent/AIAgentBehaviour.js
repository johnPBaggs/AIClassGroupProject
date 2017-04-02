#pragma strict


/*
 *This class will represent the AI Agent's logic and decision making systems
 *	This class currently does not do anything, but will in the future submissions
 */
public class AIAgentBehaviour extends MonoBehaviour{

	public var navMeshAgentCanMove : boolean = true; //represents if the Agent is moving freely or with the navigationMesh
	
	public var lightColor : Color[] = new Color[5]; //0 nothing (red), 1 going to goal (Green), 2 AimingAndStopped (blue), 3 Fleeing (magenta), 4 Healing (white)
	public var behaviourLight : Light;
	

	public var canShoot : boolean = true; //represents if the Agent can shoot
	
	public var isAiming : boolean = false;
	
	public var isFleeing : boolean = false;
	
	public var navMeshAgentIsMoving : boolean = false;
	
	public var isHealing : boolean = false;
	
	public var enemyListSize : int = 0;
	public var agentMovement : AIAgentAimingMovement;
	public var agentCollider : AgentCollider;
	public var firingScript : TriggerOnMouseOrJoystick;
	public var agentFleeingScript : AIAgentFlee;
	
	public var numberOfTargetsReached : int = 0;
	public var numberOfTargets : int;
	
	public var navMeshAgent : AIAgentTryNav;
	
	public var agentHealth : float;
	public var maxAgentHealth : float;
	//public var lightComp : Light;
	
	public function Awake() {
		agentMovement = gameObject.GetComponent.<AIAgentAimingMovement>();
		agentCollider = gameObject.GetComponent.<AgentCollider>();
		navMeshAgent = gameObject.GetComponent.<AIAgentTryNav>();
		agentFleeingScript = gameObject.GetComponent.<AIAgentFlee>();
		numberOfTargets = navMeshAgent.targetScript.listSize;
		lightColor[0] = Color.red;
		lightColor[1] = Color.green;
		lightColor[2] = Color.blue;
		lightColor[3] = Color.magenta;
		lightColor[4] = Color.white;
		maxAgentHealth = transform.GetComponent.<Health>().maxHealth;
//		behaviourLight = GetComponentInParent.GetType("Behaviour");
		
		// Make a game object
   		 behaviourLight = GameObject.FindGameObjectWithTag("Behaviour").GetComponent.<Light>();
		behaviourLight.color = lightColor[1];

    // Set color and position
    //lightComp.color = lightColor[1];

    // Set the position (or any transform property)
   // behaviourLight.transform.position = Vector3(0, 5, 0);
	}
	
	
	
	public function Update() {
	if(isFleeing == true)
			behaviourLight.color = lightColor[3];
		else if(isAiming == true)
			behaviourLight.color = lightColor[2];
		else if(isHealing == true)
			behaviourLight.color = lightColor[4];
		else
			behaviourLight.color = lightColor[1];
	agentHealth = transform.GetComponent.<Health>().health;
		if(enemyListSize > 0) {
			if((agentHealth / maxAgentHealth) * 100 < 98) {
				if(isFleeing == false) {
					navMeshAgent.notGoingToTarget();
					isFleeing = true;
					navMeshAgent.setFleeTarget();
					navMeshAgent.iShouldFlee();
					aimAndFireAndFlee();
					navMeshAgent.resume();
					//agentFleeingScript.setFleeTarget(agentCollider.currentTopOfList);
					//agentFleeingScript.iShouldFlee();
				}
			} else {
				aimAndFire();
			}
		} 
		if(enemyListSize <= 0 && isAiming == true){
			stopAimAndFire();
			if(isFleeing == true) {
				isFleeing = false;
				//navMeshAgent.setFleeTarget();
				navMeshAgent.iShouldStopFleeing();
			}
		}
		
		if(enemyListSize <= 0) {
			if((agentHealth / maxAgentHealth) * 100 < 98) {
				isHealing = true;
			} else {
				isHealing = false;
			}
			if(navMeshAgentIsMoving == false && numberOfTargetsReached < numberOfTargets && isHealing == false) {
				if(navMeshAgent.isStopped == false) {
					navMeshAgent.goingToTarget();
					navGetNewTargetAndMove();
				}
				else 
					navMeshAgent.setNewDestination();
			}
		}
		
			
		numberOfTargetsReached = navMeshAgent.targetScript.numberOfChanged;
	}
	
	public function aimAndFire() {
		navMeshAgentIsMoving = false;
		isAiming = true;
		agentMovement.setIsAiming(isAiming);
		if(isFleeing == false)
			navMeshAgent.stop();
		firingScript.aiAgentStartFiring();
	}
	
	public function aimAndFireAndFlee() {
		navMeshAgentIsMoving = false;
		isAiming = true;
		agentMovement.setIsAiming(isAiming);
		//if(isFleeing == false)
			//navMeshAgent.stop();
		firingScript.aiAgentStartFiring();
	}
	
	public function stopAimAndFire() {
		firingScript.aiAgentStopFiring();
		isAiming = false;
		agentMovement.setIsAiming(isAiming);
		//navMeshAgent.canMove = true;
		if(isFleeing == false)
			navMeshAgent.resume();
	}
	
	public function navGetNewTargetAndMove() {
		navMeshAgent.setNewDestination();
		navMeshAgent.resume();
		navMeshAgentIsMoving = true;
	}
}
