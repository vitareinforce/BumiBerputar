(function () {
  var webglEl = document.getElementById('webgl');
  if (!Detector.webgl) {
    Detector.addGetWebGLMessage(webglEl);
    return;
  }
  var width  = window.innerWidth;
  var height = window.innerHeight;
  var radius   = 0.5;
  var segments = 32;
  var rotation = 6;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
  camera.position.z = 1.5;
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  scene.add(new THREE.AmbientLight(0x333333));
  var cahayaMatahari = new THREE.DirectionalLight(0xFAE088, 1);
  cahayaMatahari.position.set(7,0,5);
  scene.add(cahayaMatahari);
  var bumi = ciptakanBumi(radius, segments);
  bumi.rotation.y = rotation;
  scene.add(bumi)
  var awan = ciptakanAwan(radius, segments);
  awan.rotation.y = rotation;
  scene.add(awan)
  var angkasa = ciptakanGalaksi(90, 64);
  scene.add(angkasa);
  var controls = new THREE.TrackballControls(camera);
  webglEl.appendChild(renderer.domElement);
  render();
  function render() {
    controls.update();
    bumi.rotation.y += 0.005;
    awan.rotation.y += 0.014;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  function ciptakanBumi(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshPhongMaterial({
        map:         THREE.ImageUtils.loadTexture('assets/lapisanbumi/permukaan.jpg'),
        bumpMap:     THREE.ImageUtils.loadTexture('assets/lapisanbumi/gunung.jpg'),
        bumpScale:   0.005,
        specularMap: THREE.ImageUtils.loadTexture('assets/lapisanbumi/laut.png'),
        specular:    new THREE.Color('grey')
      })
    );
  }
  function ciptakanAwan(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius + 0.003, segments, segments),
      new THREE.MeshPhongMaterial({
        map:         THREE.ImageUtils.loadTexture('assets/lapisanbumi/awan.png'),
        transparent: true
      })
    );
  }
  function ciptakanGalaksi(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshBasicMaterial({
        map:  THREE.ImageUtils.loadTexture('assets/lapisanbumi/angkasa.png'),
        side: THREE.BackSide
      })
    );
  }
}());
