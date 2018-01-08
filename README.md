# react-carousel
Simple React.js carousel with infinite loop, without dependencies

```
<Carousel
  current={2}
  size={4}
  afterChange={(index) => alert(`Next slide is ${index + 1}!`)}
>
  <img src="https://dummyimage.com/200x200/000/fff.jpg&text=1" />
  <img src="https://dummyimage.com/200x200/000/fff.jpg&text=2" />
  <img src="https://dummyimage.com/200x200/000/fff.jpg&text=3" />
  <img src="https://dummyimage.com/200x200/000/fff.jpg&text=4" />
  <img src="https://dummyimage.com/200x200/000/fff.jpg&text=5" />
  <img src="https://dummyimage.com/200x200/000/fff.jpg&text=6" />
  <img src="https://dummyimage.com/200x200/000/fff.jpg&text=7" />
  <img src="https://dummyimage.com/200x200/000/fff.jpg&text=8" />
</Carousel>
```
