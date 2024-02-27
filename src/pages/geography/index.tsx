import type { FC } from 'react';
import { useEffect } from 'react';

import './index.less';

import { Typography } from 'antd';

import { useLocale } from '@/locales';

import { Scene, PolygonLayer, LineLayer, PointLayer } from '@antv/l7';
import { Mapbox, GaodeMap } from '@antv/l7-maps';

import earthFlyLine from 'earth-flyline';
//请先下载地图文件（可去第三方下载） 然后注册地图 本项目的地图文件在src/map/world
import geoJson from '../../assets/data/world.json';
import img from '../../assets/img/Earth Map.jpg'

const render0 = () => {
  const scene = new Scene({
    id: 'map',
    map: new Mapbox({
      pitch: 0,
      style: 'blank',
      center: [116.368652, 39.93866],
      zoom: 10.07,
    }),
  });
  scene.on('loaded', () => {
    fetch(
      // 'https://gw.alipayobjects.com/os/bmw-prod/1981b358-28d8-4a2f-9c74-a857d5925ef1.json' //  获取行政区划P噢利用
      'https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json',
    )
      .then(res => res.json())
      .then(data => {
        const chinaPolygonLayer = new PolygonLayer({
          autoFit: true,
        }).source(data);

        chinaPolygonLayer
          .color('name', [
            'rgb(239,243,255)',
            'rgb(189,215,231)',
            'rgb(107,174,214)',
            'rgb(49,130,189)',
            'rgb(8,81,156)',
          ])
          .shape('fill')
          .style({
            opacity: 1,
          });
        //  图层边界
        const layer2 = new LineLayer({
          zIndex: 2,
        })
          .source(data)
          .color('rgb(93,112,146)')
          .size(0.6)
          .style({
            opacity: 1,
          });

        scene.addLayer(chinaPolygonLayer);
        scene.addLayer(layer2);

        // 加了这一段
        document.addEventListener(
          'click',
          () => {
            scene.fitBounds([
              [112, 32],
              [114, 35],
            ]);
          },
          false,
        );
      });
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/c4a6aa9d-8923-4193-a695-455fd8f6638c.json', //  标注数据
    )
      .then(res => res.json())
      .then(data => {
        const labelLayer = new PointLayer({
          zIndex: 5,
        })
          .source(data, {
            parser: {
              type: 'json',
              coordinates: 'center',
            },
          })
          .color('#fff')
          .shape('name', 'text')
          .size(12)
          .style({
            opacity: 1,
            stroke: '#fff',
            strokeWidth: 0,
            padding: [5, 5],
            textAllowOverlap: false,
          });

        scene.addLayer(labelLayer);
      });
  });
};

const render1 = () => {
  earthFlyLine.registerMap('world', geoJson as any);
  //获取dom节点作为容器 注：该节点请设置宽高
  const dom = document.getElementById('map') as HTMLElement;
  const chart = earthFlyLine.init({
    dom,
    map: "world",
    config: {
      R: 140,
      bgStyle : {
        color: "#FFFFFF",
        opacity: 0,
      },
      texture : {
        path: img,
        mixed: true,
      },
      earth: {
        color: "#FFFFFF",
      },
      mapStyle: {
        areaColor: "#FFFFFF",
        lineColor: "#4169E1",
        opacity: 0.3,
      },
      spriteStyle: {
        color:"#797eff"
      }, 
      pathStyle: {
        color: "#cd79ff", 
      },
      flyLineStyle: {
        color: "#cd79ff",
      },
      scatterStyle: {
        color: "#cd79ff",
      },
      hoverRegionStyle: {
        areaColor: "#000000",
        opacity: 0.5,
      },  
      regions: {
        China: {
          areaColor: "#2e3564",
          opacity: 0.5,
        },
      },
    },
  });

  const flyLineData = [
    {
      from:{
        id:1,
        lon: 116, //经度
        lat: 40, //维度
      },
      to:{
        id:2,
        lon: 14, //经度
        lat: 52, //维度
      },
    }
  ]
  chart.addData('flyLine',flyLineData)

  return (
    <>

    </>
  )
};

// 同样你也可以初始化一个 Mapbox 地图

const GeographyPage: FC = () => {
  useEffect(() => {
    render1();
  }, []);

  const { formatMessage } = useLocale();
  return (
    <div className="geography-page">
      <div className="innerText">
        <Typography className="geography-intro">
          <div id="map" className="geography-map"></div>
        </Typography>
      </div>
    </div>
  );
};

export default GeographyPage;
