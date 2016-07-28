/* global site,Modernizr,alert */

window.site = {

	$window: $(window),
	$body: $('body'),


	init: function() {

	},


	ready: function() {


		// SET INPUT TO TODAYS DATE
		//--------------------------------------------------------------

			function getDate() {
			    var today = new Date();
			    var dd = today.getDate();
			    var mm = today.getMonth()+1; //January is 0!
			    var yyyy = today.getFullYear();
			    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
			    today = yyyy+""+mm+""+dd;
			    document.getElementById("goal-date").value = today;
			}
			getDate();


		// SHOW TASKS
		//--------------------------------------------------------------

			if (Modernizr.localstorage) {
				// run localStorage code here...

				// Load now tasks
				var i = 0;
				for (i = 0; i < localStorage.length; i++) {

					// Get task and split into array
					goal = localStorage.getItem('goal-' + i)
					goalEdit = goal.split('#');

					// Display Tasks
					$('.goals__list').append("<li class='goal-" + i + "' data-date='" + goalEdit[1] + "'><span class='name'>" + goalEdit[0] + "</span><a href='#'>&times;</a></li>");

				}

			}

			else {
				// no native support for local storage
				alert('No localStorage Support :(');
			}



		// Add a task
		//--------------------------------------------------------------

			// NOW
			$(".goals__form").submit(function() {
				if ($(".goal-date").val() !== "" ) {

					// Build task to store then split into array to display
					goal = $(".goal-name").val() + '#' + $(".goal-date").val();
					goalEdit = goal.split('#');

					// Set Task
					localStorage.setItem( "goal-" + i, goal );

					// Append Task
					$(".goals__list").append("<li class='goal-" + i + "' data-date='" + goalEdit[1] + "' data-type='" + goalEdit[2] + "'><span class='name'>" + goalEdit[0] + "</span><a href='#'>&times;</a></li>");
					$(".goal-name").val("");

					i++;
					console.log(goalEdit);
				}
				return false;
			});




		// Remove a task
		//--------------------------------------------------------------

			$(".goals__list li a").on( "click", function() {
				localStorage.removeItem($(this).parent().attr("class"));
				$(this).parent().hide();
				for(i = 0; i < localStorage.length; i++) {
					if( !localStorage.getItem("goal-"+i)) {
						localStorage.setItem("goal-"+i, localStorage.getItem('goal-' + (i+1) ) );
						localStorage.removeItem('goal-'+ (i+1) );
					}
				}
			});


	},


	loaded: function() {

		//

	}


};

site.init();

$(document).ready(site.ready);

$(window).load(site.loaded);
