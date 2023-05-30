import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { DOMParser } from 'xmldom';

const DataTypes = SQ.DataTypes;

// 데이터베이스 생성
export const Restroom = sequelize.define(
    'restroom',
    {
        idx: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        lng: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },

    },
    {
        timestamps: false,
    }
);
// Data 모델과 연결된 데이터베이스 테이블이 존재하는지 확인하고 없다면 생성
Restroom.sync({ force: false })
    .then(() => {
        console.log('restroom 모델과 연결된 데이터베이스 테이블이 성공적으로 생성되었습니다.');
    })
    .catch((error) => {
        console.error('Data 모델과 연결된 데이터베이스 테이블 생성 중 에러 발생: ', error);
    });

export async function restroomdataSave() {
    console.log("실행중");
    try {
        for (var i = 0; i < 201; i++) {
            const url = `http://openAPI.seoul.go.kr:8088/4550596c7365687731323346776b5a6f/xml/SearchPublicToiletPOIService/1/200/`;
            const response = await fetch(url);
            if (response.status === 200) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(response, 'text/xml');
                console.log(xmlDoc['SearchPublicToiletPOIService'])
                var rows = xmlDoc.getElementsByTagName('row');

                const name = rows[i].getElementsByTagName('FNAME')[0].textContent
                const lat = rows[i].getElementsByTagName('Y_WGS84')[0].textContent
                const lng = rows[i].getElementsByTagName('X_WGS84')[0].textContent

                console.log('데이터파싱완')

                // Data 모델에 해당하는 데이터 생성하기 (sequelize의 create 메소드 사용)
                await Restroom.create({
                    name: name,
                    lat: lat,
                    lng: lng,
                })
                    .then((result) => {
                        console.log('데이터 업데이트 성공:', result);
                    })
                    .catch((error) => {
                        console.error('데이터 업데이트 중 실패:', error);
                    });
            }
        }
    }
    catch (error) {
        console.error('restroomdataSave 함수 오류:', error);
    }
}
await restroomdataSave();
