#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <cv.h>
#include <highgui.h>
#include <opencv2/imgproc/imgproc.hpp>
#include <stdio.h>
#include <iostream>

using namespace cv;

void gray(Mat image){
    Mat gray_image;
    cvtColor( image, gray_image, CV_BGR2GRAY );
//    namedWindow( "Gray image", WINDOW_NORMAL );
    imshow( "Gray image", gray_image );
    
}

void draw(Mat img){
    Mat draw;
    img.copyTo(draw);
    rectangle(
        draw,
        cv::Point(10, 300),
        cv::Point(150, 100),
        cv::Scalar(255, 255, 255)
    );
  //  namedWindow( "Draw rectangle", WINDOW_NORMAL );
    imshow( "Draw rectangle", draw );

}

void treshold(Mat image){
    int threshold_value = 0;
    int const max_BINARY_value = 255;
    Mat dst;
    threshold( image, dst, threshold_value, max_BINARY_value,THRESH_BINARY );
    //namedWindow( "Treshold", WINDOW_NORMAL );
    imshow( "Treshold ", dst );
}

void myGray(Mat img){
    Mat image;
    img.copyTo(image);
    for(int y=0;y<img.rows;y++) {
        for(int x=0;x<img.cols;x++) {
            Vec3b color = image.at<Vec3b>(Point(x,y));
	    color[0] = color[1] = color [2] = (color[0] + color[1] + color[2])/3;
            image.at<Vec3b>(Point(x,y)) = color;
        }
    }
    //namedWindow( "my Gray", WINDOW_NORMAL );
    imshow( "My gray", image );

}
void myTreshold(Mat img){
    Mat image;
    img.copyTo(image);
    for(int y=0;y<img.rows;y++) {
        for(int x=0;x<img.cols;x++) {
            Vec3b color = image.at<Vec3b>(Point(x,y));
                if ((color[0] + color[1] + color[2])/3 < 150){
		    color[0] = color[1] = color [2] = 255;
	        }else {
		    color[0] = color[1] = color [2] = 0;
	        }
        image.at<Vec3b>(Point(x,y)) = color;
        }
    }
  //  namedWindow( "My treshold", WINDOW_NORMAL );
    imshow( "My treshold", image );

}


int main( int argc, char** argv ) {
    char* imageName = argv[1];
    Mat image;
    image = imread( imageName, 1 );
    if ( argc != 2 || !image.data ) {
        printf( " No image data \n " );
        return -1;
    }
//    namedWindow( imageName, WINDOW_NORMAL );
    imshow( imageName, image );
    gray(image);
    draw(image);
    treshold(image);
    myGray(image);
    myTreshold(image);
    waitKey(0);
    return 0;
}
