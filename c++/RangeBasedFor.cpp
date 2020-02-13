#include <iostream>
using namespace std;

int main(){
    int aList[5] = {10,20,30,40,50};

    for(auto n : aList)
        cout << n << ' ';

    cout << endl;
    for(auto &n : aList)
        cout << n << ' ';

    int age;
    cout << "나이를 입력해주세요 : " ;
    cin >> age;
    
    cout << "당신의 나이는 : " << age << "살 입니다" << endl;
    
    
}