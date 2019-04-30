/*document.addEventListener('DOMContentLoaded', function () {
	if (document.querySelectorAll('#map').length > 0)
	{
	  if (document.querySelector('html').lang)
		lang = document.querySelector('html').lang;
	  else
		lang = 'en';
  
	  var js_file = document.createElement('script');
	  js_file.type = 'text/javascript';
	  js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAQeOCQuyykCzjnb2M874aEVpHTl3RRR6Y' + lang;
	  document.getElementsByTagName('head')[0].appendChild(js_file);
	}
  });*/

//The custom overlay object's prototype to a new instance of OverlayView
var overlay
MimOverlay.prototype = new google.maps.OverlayView()

//Initialize Google maps
var map;

function initMap() {

  var center = { lat: 59.905000, lng: 10.764500 }
  var options = {
    center: center,
    zoom: 17,
    //minZoom: 16,
    //maxZoom: 18,
    mapTypeId: 'satellite',
    rotateControl: false,
    tilt: 0,
    streetViewControl: false,
    /*streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
  },*/
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: false,
    fullscreenControl: true,
    gestureHandling: 'greedy'
  }

  map = new google.maps.Map(document.getElementById('map'), options)
  
   //Overlay
   var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(59.902597, 10.760970),
    new google.maps.LatLng(59.907220, 10.769790)
  )

  // The overlay
  var srcImage = '../img/mimkart3.svg'

  // The custom overlay object contains the overlay,
  // the bounds of the image, and a reference to the map.
  overlay = new MimOverlay(bounds, srcImage, map)

  var icons = {
    marker3d: '3d-punkt.svg',
    marker360: '3d-punkt.svg',
    markerFoto: '3d-punkt.svg',
    markerFilm: 'film-punkt.svg',
    markerSpill: 'spill-punkt.svg',
  }

  var features = [
 
     {
      lat: 59.903495,
      lng: 10.761470,
      type: 'marker360',
      data: { id: '7P2V5', title: 'Inne i Mariakirken' },
      label: '360º: Mariakirken'
      //Inne i Mariakirken 360
    },
    {
      lat: 59.903620,
      lng: 10.762160,
      type: 'marker3d',
      data: { id: 'cb86c7b100834cfcbeef0d151ef619a6', title: 'Mariakirken' },
      label: '3D: Mariakirken'
      //Mariakirken 3D
    },
    {
      lat: 59.905690,
      lng: 10.762486,
      type: 'marker3d',
      data: { id: '429605d3354343e391bc11aac896c589', title: 'Sjøboder og brygge' },
      label: '3D: Sjøboder'
      //Sjøboder 3D
    },
    {
      lat: 59.904232,
      lng: 10.761228,
      type: 'marker3d',
      data: { id: 'a4eb2e9ab5754fc3a4e4cf9fd63edf40', title: 'Middelalderbåt' },
      label: '3D: Middelalderbåt'
      //Middelalderbåt 3D
    },
    {
      lat: 59.906032,
      lng: 10.767468,
      type: 'marker3d',
      data:  { id: 'f956368d3acb4600b7a04d0596ad8ac7', title: 'Ladegårdens kjeller' },
      label: '3D: Kjeller'
      //Kjeller 3D Ladegården
    },
    {
      lat: 59.906500,
      lng: 10.768990,
      type: 'marker3d',
      data:  { id: '264a0df6f9f7412a8945b7a183436175', title: 'Olavsklosteret' },
      label: '3D: Olavsklosteret'
      //Olavsklosteret 3D Ladegården
    },
    {
      lat: 59.906032,
      lng: 10.764468,
      type: 'marker3d',
      data: { id: '1ab638b32bc54e8ba3120a6abb24d5f4', title: 'Fjøs' },
      label: '3D: Fjøs'
      //Fjøs 3D NIKU
    },
    {
      lat: 59.906032,
      lng: 10.765768,
      type: 'marker3d',
      data:  { id: '7cfac08ef4db4a4e8ff725856d0699d1', title: 'Bispeallmenningen' },
      label: '3D: Gateparti'
      //Bispeallmenningen 3D NIKU
    },
    {
      lat: 59.905332,
      lng: 10.765500,
      type: 'markerFoto',
      data:  { id: 'jernbanemuseet_sørenga.png', title: 'Fra utgravningen av jernbanen' },
      label: 'Foto: Utgravninger'
      //Fra utgravingen av jernbanen Foto Jernbanemusset
    },
    {
      lat: 59.904032,
      lng: 10.763600,
      type: 'markerFoto',
      data:  { id: 'jernbanemuseet_damplokomotiv.png', title: 'Damplokomotiv' },
      label: 'Foto: Damplokomotiv'
      //Damplokomotiv Foto Jernbanemuseet
    }
    /*{
      lat: 59.9108202,
      lng: 10.7506900,
      type: 'markerSpill',
      data: { id: 'Kjeglebanen/index.html', title: 'Kjeglebane-spill' }
      //kjeglebane-spill
    },
    {
      lat: 59.908849,
      lng: 10.751809,
      type: 'markerFilm',
      data: { id: 'x53I9o4jgks', title: 'Oslo havn 1798'}
      //film
    }*/
  ]

  var templates = {

    marker3d: function(data) {
      return `<div class="info-window-container"><div class="sketchfab-embed-wrapper"><iframe width="380" height="280" 
      src="https://sketchfab.com/models/${data.id}/embed?annotation_cycle=8" frameborder="0" 
      allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" 
      onmousewheel=""></iframe><div class="iw-title"><p>${data.title}</p></div></div>`
    },

    markerFoto: function(data) {
      return `<div class="info-window-container"><img src="../img/${data.id}" width="380" height="auto"></img><div class="iw-title"><p>${data.title}</p></div></div>`
    },

    /*markerFoto: function(data) {
      return `<div id="iw-container"><div class="iw-content"><img src="../img/${data.id}" width="380" height="auto"></img><div class="iw-title"><p>${data.title}</p></div></div></div`
    },*/

    marker360: function (data){return `<div class="info-window-container"><iframe width="380" height="280"
      style="width: 380px; height: 280px; border: none;" frameborder="0" allow="vr,gyroscope,accelerometer,fullscreen"
      scrolling="no" allowfullscreen="true" style="max-width: 100%;" 
      src="https://kuula.co/share/${data.id}?fs=1&vr=1&iosfs=1&thumbs=1&hideinst=1&chromeless=1&logo=-1"></iframe><div class="iw-title"><p>${data.title}</p></div></div>`
    },
  
    markerFilm: function(data) {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data.id}?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><div class="iw-title"><p>${data.title}</p></div>`
    },
  
    markerSpill: function(data) {
      return `<iframe width="560" height="350"
      src="${data.id}" style="border:0"></iframe><div class="iw-title"><p>${data.title}</p></div>`
    }

  }



  //var infoWindow = new google.maps.InfoWindow();

  features.forEach(function (feature) {
    var marker = new MarkerWithLabel({
      position: new google.maps.LatLng(feature.lat, feature.lng),
      icon: {
        url: '/img/' + icons[feature.type],
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
      },
      labelContent: '' + [feature.label],
      labelAnchor: new google.maps.Point(55, 68),
      labelClass: 'custom-label',
      labelInBackground: true,
      map,
      animation: google.maps.Animation.DROP
    })

     // Set up handle bars
     //var template = Handlebars.compile($('#marker-content-template').html());

       // Set up a close delay for CSS animations
    var infoWindow = null;
    var closeDelayed = false;
    var closeDelayHandler = function() {
        $(infoWindow.getWrapper()).removeClass('active');
        setTimeout(function() {
            closeDelayed = true;
            infoWindow.close();
        }, 300);
    };

    // Add a Snazzy Info Window to the marker
   var infoWindow = new SnazzyInfoWindow({
    marker: marker,
    wrapperClass: 'custom-window',
    closeWhenOthersOpen: 'true',
    offset: {
        top: '-60px'
    },
    edgeOffset: {
        top: 50,
        right: 60,
        bottom: 50
    },
    border: false,
    closeButtonMarkup: '<button type="button" class="custom-close"></button>',
    callbacks: {
        open: function() {
            $(this.getWrapper()).addClass('open');
        },
        afterOpen: function() {
            var wrapper = $(this.getWrapper());
            wrapper.addClass('active');
            wrapper.find('.custom-close').on('click', closeDelayHandler);
        },
        beforeClose: function() {
            if (!closeDelayed) {
                closeDelayHandler();
                return false;
            }
            return true;
        },
        afterClose: function() {
            var wrapper = $(this.getWrapper());
            wrapper.find('.custom-close').off();
            wrapper.removeClass('open');
            closeDelayed = false;
        }
    }
});



    marker.addListener('click', function () {
      var template = templates[feature.type];
      var content = template(feature.data);
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
    

  });




 /* google.maps.event.addListener(infoWindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw-d');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
  /*  var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'none', 'z-index' : '1', 'background': '#45C9B7'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({opacity: '1', right: '8px', top: '5px', width: '23px', height: '23px', 'background-image': 'url(../img/x.svg)', 'border': '5px solid #45C9B7', 'border-radius': '50%', 'box-shadow': '0 0 5px black', 'background-color': '#45C9B7', 'overflow': 'hidden'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }

   // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
  });*/

} //End of initMap


/** @constructor */
function MimOverlay(bounds, image, map) {
  // Initialize all properties.
  this.bounds_ = bounds
  this.image_ = image
  this.map_ = map

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null

  // Explicitly call setMap on this overlay.
  this.setMap(map)
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
MimOverlay.prototype.onAdd = function () {
  var div = document.createElement('div')
  div.style.borderStyle = 'none'
  div.style.borderWidth = '0px'
  div.style.position = 'absolute'

  // Create the img element and attach it to the div.
  var img = document.createElement('img')
  img.src = this.image_
  img.style.width = '100%'
  img.style.height = '100%'
  img.style.position = 'absolute'
  div.appendChild(img)

  this.div_ = div

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes()
  panes.overlayLayer.appendChild(div)
}

MimOverlay.prototype.draw = function () {
  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection()

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest())
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast())

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_
  div.style.left = sw.x + 'px'
  div.style.top = ne.y + 'px'
  div.style.width = ne.x - sw.x + 'px'
  div.style.height = sw.y - ne.y + 'px'
}

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
MimOverlay.prototype.onRemove = function () {
  this.div_.parentNode.removeChild(this.div_)
  this.div_ = null
}

// Set the visibility to 'hidden' or 'visible'.
MimOverlay.prototype.hide = function() {
  if (this.div_) {
    // The visibility property must be a string enclosed in quotes.
    this.div_.style.visibility = 'hidden';
  }
};

MimOverlay.prototype.show = function() {
  if (this.div_) {
    this.div_.style.visibility = 'visible';
  }
};

MimOverlay.prototype.toggle = function() {
  if (this.div_) {
    if (this.div_.style.visibility === 'hidden') {
      this.show();
    } else {
      this.hide();
    }
  }
};

//google.maps.event.addDomListener(window, 'load', initMap);
//initMap();
