/*
  Pressure sensing
*/
void setup() {
    pinMode(A0,INPUT);
    pinMode(5,OUTPUT);
    Serial.begin(9600);
}

void loop() {
    if(analogRead(A0)>1000)//1000 - threshold value
    {
      digitalWrite(5,HIGH);//Sending signal to relay
     delay(5000);
    }
    else
    {
      digitalWrite(5,LOW);
      delay(5000);
    }
}