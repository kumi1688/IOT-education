#include <iostream>
using namespace std;


int main(){
    char *arr = new char(12);
    cout << "배열이 생성되었습니다" << endl;
    delete arr;
    cout << "배열이 삭제되었습니다" << endl;

    int aList[5] = {10,20,30,40,50};
    int sList[5];
    for(auto n: aList) 
        
        
}