int Pir = 2;                                 //Pir sensor is Pin 2
#include <Servo.h> 

Servo myservo;                          // create servo object to control a servo 
                                        // a maximum of eight servo objects can be created 

int pos = 0;                           // variable to store the servo position 
                                       // Pin 2 has an Motion sensor connected
                                       // give it a name:

void setup() {                                     // the setup routine runs once when you press reset
  
  pinMode(PIR, INPUT);                             // initialize the digital pin as an output.
  myservo.attach(9);                               // attaches the servo on pin 9 to the servo object

}


void loop()                          // the loop routine runs over and over again forever
  {
  if(digitalRead(PIR,HIGH))
  {
  for(pos = 0; pos < 180; pos ++)  // goes from 0 degrees to 180 degrees 
  
  {                                  // in steps of 1 degree 
    myservo.write(pos);              // tell servo to go to position in variable 'pos' 
    delay(25);                       // waits 25ms for the servo to reach the position 
  } 
  delay(10000);
  for(pos = 180; pos>0; pos--)     // goes from 180 degrees to 0 degrees 
  {                                
    myservo.write(pos);              // tell servo to go to position in variable 'pos' 
    delay(25);                       // waits 25ms for the servo to reach the position 
  } 
  }
   delay(5000); 
 }