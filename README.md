# d3-audio

<p>this is an experiment using d3 based on https://bl.ocks.org/mbostock/9539958</p>
<p>the purpose of this experiment is to link the .wav file "waves.wav", an audio loop of ocean waves, to the d3 visualizer to create a unified audio-visual experience</p>
  
## changes

### landing page
- [x] index.html says:<br>
  - [x] waves<br>
  - [x] an audio-visual experience <br>
  - [x] with a logo of headphones<br>
  - [x] a play button(not sure if this is needed)
- [ ] clicking the experience fades the words and begins the experience(sound fades in and animation starts)
- [x] word "archive at the bottom of the page
- [x] clicking "archive" takes you to the archive index page which links to all previous projects
- [x] each previous project stored in a named folder, link to the index.html in the folder

### waves
- [x] sound endlessly loops
- [x] stop-sound button makes sound stop 
- [x] create a new color palette based on the picture I took this morning ./waves.jpeg
- [x] the animation should expand totally off the screen before is dissapates
- [x] some property of the circle should be affected by sound amplitude (emission rate, radius, alpha perhaps)
- [ ] make higher pitched sounds emit more white and lower pitched sounds emit more dark
