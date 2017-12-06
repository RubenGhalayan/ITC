#include "opencv2/objdetect/objdetect.hpp"
 #include "opencv2/highgui/highgui.hpp"
 #include "opencv2/imgproc/imgproc.hpp"

 #include <iostream>
 #include <stdio.h>

 using namespace std;
 using namespace cv;

 void detectAndDisplay( Mat frame );

 int main( int argc, const char** argv ) {
   Mat frame = imread (argv[1]);
   detectAndDisplay(frame);
   waitKey(0);
   return 0;
 }

/** @function detectAndDisplay */
void detectAndDisplay( Mat frame ) {
 CascadeClassifier face_cascade;
 face_cascade.load( "haarcascade_frontalface_default.xml");
  std::vector<Rect> faces;
  Mat frame_gray;
  cvtColor( frame, frame_gray, CV_BGR2GRAY );
  equalizeHist( frame_gray, frame_gray );
  //-- Detect faces
  face_cascade.detectMultiScale( frame_gray, faces, 1.08, 3, 1|CV_HAAR_SCALE_IMAGE, Size(25, 25) );

  for( size_t i = 0; i < faces.size(); i++ ) {
    Point center( faces[i].x + faces[i].width*0.5, faces[i].y + faces[i].height*0.5 );
    ellipse( frame, center, Size( faces[i].width*0.5, faces[i].height*0.5), 0, 0, 360, Scalar( 255, 0, 255 ), 4, 8, 0 );
    Mat faceROI = frame_gray( faces[i] );

  }
    namedWindow( "detect", CV_WINDOW_NORMAL );
    resizeWindow("detect", 600,500);
    moveWindow("detect", 0,0);
    imshow( "detect", frame );
 }
