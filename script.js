/**
 * 
 *  @author: Rakesh kumar
 *  @created on: 02/07/2014
 *
 */

// Get Data once submit button is pressed
function takeData(){
		var title=document.getElementById("title").value;
		var info=document.getElementById("desc").value;
		if(title!=="" && info!==""){
			if(!localStorage.getItem(title))
			{
				try{
					localStorage.setItem(title,info);
					createlist(title,info);
				}
				catch(e) {
					console.log("localStorage Storage limit reached...Clear Data");
					return;
				}
			}
			else{
				alert("Same Title name exists!");
			}

		}
		else{
			alert("Title & Description are required!");
		}
	}

//Dynamically helps in creating list	
function createlist(title,info){
	var ul = document.getElementById("list");
	var listtemplate=document.createElement("div");
	listtemplate.innerHTML="<img src='img.png'><div><div>"+title+"</div><textarea readonly onchange='textEdited(this)'>"+info+"</textarea></div><button onclick='onEdit(this)'>Edit</button><button onclick='onDelete(this)'>Delete</button>";
	ul.appendChild(listtemplate);
}

//On Page load, get data from localstorage and render list
function load(){
	var len=localStorage.length;
	for(i=0;i<len;i++)
		createlist(localStorage.key(i),localStorage.getItem(localStorage.key(i)));
	//localStorage.clear();
		
}

//When edit button is clicked, make textarea readonly attribute to false
function onEdit(e){
	e.disabled=true;
	var commentdesc=e.parentNode.getElementsByTagName('textarea')[0];
	commentdesc.readOnly = !commentdesc.readOnly;

}

//Once text is change, onChange event gets triggered and changed description is stored back to localstorage
function textEdited(e){
	var editbutton=e.parentNode.parentNode.getElementsByTagName('button')[0];
	var commentTitle=e.parentNode.children[0].textContent;
	var commentdesc=e.value;
	e.readOnly = !e.readOnly;
	editbutton.disabled=false;
	localStorage[commentTitle]=commentdesc;
	return true;
}

//Deletes particular list element from DOM and same from localstorage
function onDelete(e){
	var commentArea=e.parentNode;
	var commentTitle=commentArea.children[1].children[0].textContent;
	localStorage.removeItem(commentTitle);
	commentArea.parentNode.removeChild(commentArea);

}

//Searches comments list according to title
function search(e){
	console.log("testing");
	var text=e.value;
	var list=document.getElementById('list');
	var eachelement;
	//this make inactive elements to appear once searching criteria becomes empty
	if(text==="")
	{
		for(i=0;i<list.children.length;i++)
		{
			eachelement=list.children[i];
			eachelement.removeAttribute('class');
		
		}
	}
	else{
		for(i=0;i<list.children.length;i++)
		{
			eachelement=list.children[i];
			var classname=eachelement.className;
			if(eachelement.children[1].children[0].textContent.toLowerCase().indexOf(text.toLowerCase())!=-1){
				if(classname==='inactive')
					eachelement.removeAttribute('class','inactive');
			}
			else
				eachelement.setAttribute('class','inactive');
		
		}
	}
	
}