#include <DHT.h>
#define DHTPIN 2 // 습도센서 Signal 선 연결
#define DHTTYPE DHT11 // 습도센서 종류: DHT11
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
DHT dht(DHTPIN, DHTTYPE);
int inputPin=7; //pir센서 핀
int pirState = LOW;
int val = 0;

LiquidCrystal_I2C lcd(0x3F,16,2); // LCD주소
float hum; // 습도값 저장 변수
float temp; // 온도값 저장 변수
 
void setup() {
  Serial.begin(9600);
  dht.begin();
  delay(2000);
  lcd.init();
  lcd.backlight();
  lcd.setCursor(2,0);
  delay(5000);
  pinMode(inputPin,INPUT);
  lcd.clear();
}
 
void loop() {
  hum = dht.readHumidity();//온도값 읽기
  temp= dht.readTemperature();//습도값 읽기
 
  Serial.print("HUMIDITY: "); // "HUMIDITY:" 출력
  Serial.print(hum);// 습도 값 소수점 이하 자리 없음
  Serial.print(" %, TEMPERATURE: "); //"%"(습도단위) "TEMPERATURE:" 출력
  Serial.print(temp);//온도값은 소수점 이하 1자리까지 표시
  Serial.println(" C"); //"C" 온도 단위 표시
  lcd.setCursor(0,0); // LCD Cursor 원점
  lcd.print("TEMP:"); // LCD에 "temp" 표시
 
  float t = temp; // 온도값을 t에 할당
  lcd.print(t,1); // 온도값 LCD로 출력
  lcd.print(" C"); // 온도 단위 표시
  lcd.setCursor(0,1); //LCD 커서 줄바꿈
  lcd.print("HUMIDITY:"); //LCD 2번째 줄에 "humidity:" 출력
  int h = hum; //습도값 h에 할당
  lcd.print(h); //습도값 LCD에 출력
  lcd.print(" % "); //습도 단위 출력
  lcd.println();

val = digitalRead(inputPin);
if(val==HIGH){
  if(pirState==LOW){
    Serial.println("접근");
    pirState=HIGH;
  }
  }
  else{
    if(pirState==HIGH){
    Serial.println("접근 X");
    pirState=LOW;
  }
  }
  
  delay(2000); // 샘플링 간격 2초
}
