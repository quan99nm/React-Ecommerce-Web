import { Carousel, Container, Image } from "react-bootstrap";

const Slider = (props) => {
  return (
    <>
      <Container>
        <Carousel>
          <Carousel.Item interval={1000}>
            <Image
              src={process.env.PUBLIC_URL + "/images/slider-bg.jpg"}
              alt="Background"
              fluid
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <Image
              src={process.env.PUBLIC_URL + "/images/slider-bg.jpg"}
              alt="Background"
              fluid
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <Image
              src={process.env.PUBLIC_URL + "/images/slider-bg.jpg"}
              alt="Background"
              fluid
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
};

export default Slider;
