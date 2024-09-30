import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
// material
import { styled } from '@mui/material/styles';
import { Typography, Container, Grid, Card, Box, Button } from '@mui/material';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import HeaderDashboard from 'components/HeaderDashboard';
import dynamic from 'next/dynamic';
import AdminGuard from 'guards/AdminGuard';

import DashboardLayout from 'layouts/admin';
import { WebsiteMenu } from 'layouts/admin/menuItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SvgIconStyle from 'components/SvgIconStyle';
import MultipleSwitch from 'components/MultipleSwitch';
import HeaderBreadcrumbs from '../../../../components/Breadcrumbs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

import { usePermissionQuery, useGetAnalyticsMutation, useFindUniqueWebsiteQuery } from 'generated';

import toMoneyString from 'utils/toMoneyString';
import { format } from 'date-fns';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ----------------------------------------------------------------------

const CardStyle = styled(Card)(({ theme }) => ({
  padding: '24px',
}));

const WidgetAmountStyle = styled('div')(({ theme }) => ({
  fontSize: '40px',
  textAlign: 'center',
}));
const WidgetTitleStyle = styled('div')(({ theme }) => ({
  fontSize: '14px',
  color: '#637381',
}));
const ChartTitleStyle = styled('div')(({ theme }) => ({
  fontSize: '24px',
  lineHeight: '30px',
  letterSpacing: '0.04',
  fontWeight: 700,
  color: '#212B36',
}));

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'analytics', 'generated', 'admin'])),
    },
  };
};

const RangeSelect = ({ setRange, range, onClickButton, options }) => {
  return (<Select
    value={range}
    label="Range"
    onChange={(e) => {
      setRange(e.target.value)
      onClickButton(options.find((option) => option.value === e.target.value))
    }}
  >
    {options.map((option) => {
      return <MenuItem value={option.value}>{option.title}</MenuItem>
    })}

  </Select>)
}

export default function Analytics() {
  const { themeStretch } = useSettings();
  const { data, loading } = usePermissionQuery();
  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: data?.permission?.Website
      }
    },
    skip: !data?.permission?.Website
  })
  const [getAnalytics, { loading: getAnalyticsLoading }] = useGetAnalyticsMutation();
  const { t } = useTranslation('analytics');
  const [range, setRange] = useState('a');
  const links = [
    {
      href: '/admin/Website/Website/Analytics',
      name: 'Website admin',
    },
    {
      name: 'Analytics',
    },
  ];

  const [widgetData, updateWidgetData] = useState({
    countOrderIncome: 0,
    countRequestIncome: 0,
    countPageView: 0,
  });

  const [analytuicsAt, updateAnalytics] = useState(0);

  const [incomeRange, updateIncomeRange] = useState('');
  const [timesRange, updateTimesRange] = useState('');
  const [top5ProductRange, updateTop5ProductsRange] = useState('');
  const [couponUsageRange, updateCouponUsageRange] = useState('');
  const [top5PageViewRange, updateTop5PageViewRange] = useState('');
  const [top3SalesRange, updateTop3SalesRange] = useState('');
  const [requestRange, updateRequestRange] = useState('');
  const [top5PageRequestRange, updateTop5PageRequestRange] = useState('');

  // 收益統計
  const [incomeChart, updateIncomeChart] = useState({
    series: [],
    options: {
      chart: {
        height: 300,
        type: 'area',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        area: {
          borderRadius: 4,
          columnWidth: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
      xaxis: {
        type: 'category',
        categories: [],
      },
      stroke: {
        curve: 'smooth',
      },
      fill: {
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.9,
        },
      },
    },
  });

  // 次數統計
  const [timesChart, updateTimesChart] = useState({
    series: [],
    options: {
      chart: {
        height: 300,
        type: 'area',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        area: {
          borderRadius: 4,
          columnWidth: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
      xaxis: {
        type: 'category',
        categories: [],
      },
      stroke: {
        curve: 'smooth',
      },
      fill: {
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.9,
        },
      },
    },
  });

  // 前五名商品點擊次數
  // const chartTop5Products = {
  //   series: [{
  //     data: [179, 153, 111, 85, 57],
  //   }],
  //   options: {
  //     chart: {
  //       type: 'bar',
  //       height: 300,
  //       toolbar: {
  //         show: false
  //       },
  //       zoom: {
  //         enabled: false
  //       }
  //     },
  //     plotOptions: {
  //       bar: {
  //         borderRadius: 5,
  //         horizontal: true,
  //         barHeight: 18,
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     grid: {
  //       show: false
  //     },
  //     fill: {
  //       colors: ['#39AB97', '#FFC107', '#6851FF', '#1E6CDB', '#CB6767'],
  //       opacity: 1,
  //       type: "gradient",
  //       gradient: {
  //         shade: 'light',
  //         shadeIntensity: 1,
  //         opacityFrom: 0,
  //         opacityTo: 1,
  //         stops: [0, 100]
  //       }
  //     },
  //     xaxis: {
  //       categories: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
  //       tickAmount: 10,
  //     },
  //   }
  // }

  // 近期優惠券使用次數
  // const chartCouponUsage = {
  //   series: [{
  //     data: [97, 118, 93, 79, 102]
  //   }],
  //   options: {
  //     chart: {
  //       type: 'bar',
  //       height: 300,
  //       toolbar: {
  //         show: false
  //       },
  //       zoom: {
  //         enabled: false
  //       }
  //     },
  //     plotOptions: {
  //       bar: {
  //         borderRadius: 5,
  //         horizontal: true,
  //         barHeight: 18,
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     fill: {
  //       colors: '#0C53B7',
  //       opacity: 1,
  //       type: "gradient",
  //       gradient: {
  //         shade: 'light',
  //         shadeIntensity: 1,
  //         opacityFrom: 0,
  //         opacityTo: 1,
  //         stops: [0, 100]
  //       }
  //     },
  //     xaxis: {
  //       categories: ['Coupon5', 'Coupon4', 'Coupon3', 'Coupon2', 'Coupon1'],
  //       tickAmount: 10,
  //     },
  //   }
  // }

  // 頁面瀏覽人次
  const [top5PageViewChart, updateTop5PageViewChart] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 300,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          horizontal: true,
          barHeight: 18,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: '#39AB97',
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 1,
          opacityFrom: 0,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      xaxis: {
        categories: [],
        tickAmount: 10,
      },
    },
  });

  // 銷售金額前三名產品
  const [top3salesChart, updateTop3SalesChart] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'bottom',
      },
      labels: [],
      colors: ['#FFC107', '#6851FF', '#CB6767'],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                color: '#dfsda',
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: '32px',
                offsetY: 16,
                formatter: function (val) {
                  return val;
                },
              },
              total: {
                show: true,
                label: 'Total',
                fontSize: '16px',
                color: '#637381',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
    },
  });

  // 廣告邀請次數
  const [requestChart, updateRequestChart] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 300,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: 8,
        },
      },
      xaxis: {
        type: 'category',
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: '#6851FF',
        opacity: 1,
        type: 'solid',
      },
    },
  });

  // 頁面廣告邀請次數
  const [top5PageRequestChart, updateTop5PageRequestChart] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 300,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          horizontal: true,
          barHeight: 18,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: '#6851FF',
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 1,
          opacityFrom: 0,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      xaxis: {
        categories: [],
        tickAmount: 10,
      },
    },
  });

  // multiple switch options
  const multipleSwitchOptions = [
    {
      id: 'a',
      title: t('WebsiteAdmin.AnalyticsPage.range.all'),
      value: 'a',
    },
    {
      id: 'd',
      title: t('WebsiteAdmin.AnalyticsPage.range.daily'),
      value: 'd',
    },
    {
      id: 'w',
      title: t('WebsiteAdmin.AnalyticsPage.range.weekly'),
      value: 'w',
    },
    {
      id: 'm',
      title: t('WebsiteAdmin.AnalyticsPage.range.monthly'),
      value: 'm',
    },
  ];

  const aDay = 24 * 60 * 60 * 1000;

  const getTimeInterval = (type: string) => {
    const nowTimestamp = Date.now();
    const nowDate = new Date(nowTimestamp);
    const _nowDate = Math.floor(nowTimestamp / aDay);
    let beginDate = new Date();
    let endDate = new Date();
    switch (type) {
      case 'a':
        beginDate = new Date(websiteData?.findUniqueWebsite?.createdAt);
        endDate = new Date();
        break;
      case 'd':
        beginDate = new Date(Math.floor(nowTimestamp / aDay) * aDay);
        endDate = new Date((Math.floor(nowTimestamp / aDay) + 1) * aDay - 1);
        break;
      case 'w':
        beginDate = new Date((_nowDate - (nowDate.getDay() - 1)) * aDay);
        endDate = new Date((_nowDate - (nowDate.getDay() - 1) + 6) * aDay);
        break;
      case 'm':
        beginDate = new Date((_nowDate - (nowDate.getDate() - 1)) * aDay);
        const nextMonth = new Date(
          nowDate.getMonth() < 11
            ? `${nowDate.getFullYear()}-${(nowDate.getMonth() + 2).toString().padStart(2, '0')}-01`
            : `${nowDate.getFullYear() + 1}-01-01`
        );
        endDate = new Date(nextMonth.getTime() - 1);
        break;
    }
    return {
      beginSec: Math.floor(beginDate.getTime() / 1000),
      endSec: Math.floor(endDate.getTime() / 1000),
    };
  };

  const getWidget = async (isRenew: boolean) => {
    const { beginSec, endSec } = getTimeInterval('a');

    const { data: widgetData } = await getAnalytics({
      variables: {
        wedsiteId: data?.permission.Website,
        type: 'widget',
        beginSec,
        endSec,
        isRenew,
      },
    });

    updateWidgetData(widgetData.getAnalytics);
    updateAnalytics(widgetData.getAnalytics.analyticsAt);
  };

  const getIncome = async (range: string, isRenew: boolean, isUpdate: boolean) => {
    const { beginSec, endSec } = getTimeInterval(range);

    const { data: incomeData } = await getAnalytics({
      variables: {
        wedsiteId: data?.permission.Website,
        type: 'income',
        beginSec,
        endSec,
        isRenew,
      },
    });

    if (incomeData && isUpdate) {
      const seriesOrderedProduct: number[] = [];
      const seriesOrder: number[] = [];
      const seriesRequest: number[] = [];
      const categories: string[] = [];

      incomeData.getAnalytics?.order?.forEach((element) => {
        categories.push(element.key.toString());
        seriesOrder.push(element.value);
      });

      incomeData.getAnalytics.orderedProduct.forEach((element) => {
        categories.push(element.key.toString());
        seriesOrderedProduct.push(element.value);
      });

      incomeData.getAnalytics.request.forEach((element) => {
        seriesRequest.push(element.value);
      });

      const _incomeChart = { ...incomeChart };
      _incomeChart.series = [
        // {
        //   name: t('WebsiteAdmin.AnalyticsPage.legend.product'),
        //   data: seriesOrder,
        //   color: '#FFC107',
        // },
        {
          name: t('WebsiteAdmin.AnalyticsPage.legend.product'),
          data: seriesOrderedProduct,
          color: '#FFC107',
        },
        {
          name: t('WebsiteAdmin.AnalyticsPage.legend.ad'),
          data: seriesRequest,
          color: '#6851FF',
        },
      ];
      _incomeChart.options = {
        ..._incomeChart.options,
        xaxis: {
          ..._incomeChart.options.xaxis,
          categories,
        },
      };

      updateIncomeChart(_incomeChart);
    }
  };

  const getTimes = async (range: string, isRenew: boolean, isUpdate: boolean) => {
    const { beginSec, endSec } = getTimeInterval(range);

    const { data: timesData } = await getAnalytics({
      variables: {
        wedsiteId: data?.permission.Website,
        type: 'times',
        beginSec,
        endSec,
        isRenew,
      },
    });

    if (timesData && isUpdate) {
      const seriesPageView: number[] = [];
      const seriesOrder: number[] = [];
      const categories: string[] = [];

      timesData.getAnalytics.pageView.forEach((element) => {
        categories.push(element.key.toString());
        seriesPageView.push(element.value);
      });

      timesData.getAnalytics.order.forEach((element) => {
        seriesOrder.push(element.value);
      });

      const _incomeChart = { ...incomeChart };
      _incomeChart.series = [
        {
          name: t('WebsiteAdmin.AnalyticsPage.legend.visits'),
          data: seriesPageView,
          color: '#39AB97',
        },
        {
          name: t('WebsiteAdmin.AnalyticsPage.legend.orders'),
          data: seriesOrder,
          color: '#6851FF',
        },
      ];
      _incomeChart.options = {
        ..._incomeChart.options,
        xaxis: {
          ..._incomeChart.options.xaxis,
          categories,
        },
      };

      updateTimesChart(_incomeChart);
    }
  };

  const getTop5PageView = async (range: string, isRenew: boolean, isUpdate: boolean) => {
    const { beginSec, endSec } = getTimeInterval(range);

    const { data: pageViewData } = await getAnalytics({
      variables: {
        wedsiteId: data?.permission.Website,
        type: 'top5PageView',
        beginSec,
        endSec,
        isRenew,
      },
    });

    if (pageViewData && isUpdate) {
      const seriesPageView: Record<string, any>[] = [];
      const categories: string[] = [];

      pageViewData.getAnalytics.pageView.forEach((element) => {
        categories.push(element.pageName);
        seriesPageView.push(element.count);
      });

      const _top5PageViewChart = { ...top5PageViewChart };
      _top5PageViewChart.series = [
        {
          data: seriesPageView,
        },
      ];
      _top5PageViewChart.options = {
        ..._top5PageViewChart.options,
        xaxis: {
          ..._top5PageViewChart.options.xaxis,
          categories,
        },
      };

      updateTop5PageViewChart(_top5PageViewChart);
    }
  };

  const getTop3Sales = async (range: string, isRenew: boolean, isUpdate: boolean) => {
    const { beginSec, endSec } = getTimeInterval(range);

    const { data: top3SalesData } = await getAnalytics({
      variables: {
        wedsiteId: data?.permission.Website,
        type: 'top3Sales',
        beginSec,
        endSec,
        isRenew,
      },
    });

    if (top3SalesData && isUpdate) {
      const seriesOrderedProduct: Record<string, any>[] = [];
      const labels: string[] = [];

      top3SalesData.getAnalytics.orderedProduct.forEach((element) => {
        labels.push(element.productName);
        seriesOrderedProduct.push(element.amount);
      });

      if (!seriesOrderedProduct.length) {
        seriesOrderedProduct.push(0);
      }

      const _top3salesChart = { ...top3salesChart };
      _top3salesChart.series = seriesOrderedProduct;
      _top3salesChart.options = {
        ..._top3salesChart.options,
        labels,
      };

      updateTop3SalesChart(_top3salesChart);
    }
  };

  const getRequest = async (range: string, isRenew: boolean, isUpdate: boolean) => {
    const { beginSec, endSec } = getTimeInterval(range);

    const { data: requestData } = await getAnalytics({
      variables: {
        wedsiteId: data?.permission.Website,
        type: 'request',
        beginSec,
        endSec,
        isRenew,
      },
    });

    if (requestData && isUpdate) {
      const seriesRequest: Record<string, any>[] = [];

      requestData.getAnalytics.request.forEach((element) => {
        seriesRequest.push({
          x: element.key.toString(),
          y: element.value,
        });
      });

      const _requestChart = { ...requestChart };
      _requestChart.series = [
        {
          data: seriesRequest,
        },
      ];

      updateRequestChart(_requestChart);
    }
  };

  const getTop5PageRequest = async (range: string, isRenew: boolean, isUpdate: boolean) => {
    const { beginSec, endSec } = getTimeInterval(range);

    const { data: requestData } = await getAnalytics({
      variables: {
        wedsiteId: data?.permission.Website,
        type: 'top5PageRequest',
        beginSec,
        endSec,
        isRenew,
      },
    });

    if (requestData && isUpdate) {
      const seriesPageRequest: Record<string, any>[] = [];
      const categories: string[] = [];

      requestData.getAnalytics.request.forEach((element) => {
        categories.push(element.pageName);
        seriesPageRequest.push(element.count);
      });

      const _top5PageRequestChart = { ...top5PageRequestChart };
      _top5PageRequestChart.series = [
        {
          data: seriesPageRequest,
        },
      ];
      _top5PageRequestChart.options = {
        ..._top5PageRequestChart.options,
        xaxis: {
          ..._top5PageRequestChart.options.xaxis,
          categories,
        },
      };

      updateTop5PageRequestChart(_top5PageRequestChart);
    }
  };

  const renewAll = () => {
    getWidget(true);
    multipleSwitchOptions.forEach((range) => {
      getIncome(range.id, true, incomeRange === range.id);
      getTimes(range.id, true, timesRange === range.id);
      getTop5PageView(range.id, true, top5PageViewRange === range.id);
      getTop3Sales(range.id, true, top3SalesRange === range.id);
      getRequest(range.id, true, requestRange === range.id);
      getTop5PageRequest(range.id, true, top5PageRequestRange === range.id);
    });
  };

  useEffect(() => {
    if (websiteData?.findUniqueWebsite?.createdAt) {
      updateIncomeRange('a');
      updateTimesRange('a');
      updateTop5ProductsRange('a');
      updateCouponUsageRange('a');
      updateTop5PageViewRange('a');
      updateTop3SalesRange('a');
      updateRequestRange('a');
      updateTop5PageRequestRange('a');

      getWidget(false);
      getIncome('a', false, true);
      getTimes('a', false, true);
      getTop5PageView('a', false, true);
      getTop3Sales('a', false, true);
      getRequest('a', false, true);
      getTop5PageRequest('a', false, true);
    }
  }, [websiteData]);

  if (typeof window !== 'undefined') {
    return (
      <AdminGuard>
        <DashboardLayout menu={WebsiteMenu}>
          <Page title="Analytics | yoh.app">
            <Container>
              <HeaderDashboard
                heading={t('WebsiteAdmin.AnalyticsPage.title')}
                description={
                  <>
                    <div>{t('WebsiteAdmin.AnalyticsPage.description')}</div>
                    <div>
                      {t('WebsiteAdmin.AnalyticsPage.updated').replace(
                        '%time',
                        format(new Date(analytuicsAt), 'yyyy/MM/dd hh:mm:ss')
                      )}
                    </div>
                  </>
                }
                links={[
                  // {
                  //   name: 'Website admin',
                  //   href: '/admin/Website/Website/Analytics',
                  // },
                  // { name: 'Sitemap' },
                ]}
                buttons={[
                  () => (
                    <Button
                      sx={{ mt: 3 }}
                      variant="contained"
                      onClick={renewAll}
                    >
                      {t('WebsiteAdmin.AnalyticsPage.refresh')}
                    </Button>
                  ),
                ]}
              />
              <Grid container spacing={3}>
                {/* <Grid item xs={12}>
                  <CardStyle>
                    <Grid container>
                      <Grid xs={6} item>
                        <Typography variant="h4" gutterBottom>
                          {t('WebsiteAdmin.AnalyticsPage.title')}
                        </Typography>
                        <HeaderBreadcrumbs links={links} style={{ marginTop: '15px' }} />
                      </Grid>
                      <Grid style={{ textAlign: 'right' }} xs={6} item>
                        <Box sx={{ mt: 2 }}>
                          <Button variant="contained" sx={{ backgroundColor: '#6851FF', borderRadius: '14px', '&:hover': { backgroundColor: '#6851FF' } }} onClick={renewAll}>
                            {t('WebsiteAdmin.AnalyticsPage.refresh')}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    <hr style={{ margin: '15px 0' }} />
                    <div>{t('WebsiteAdmin.AnalyticsPage.description')}</div>
                    <div>{t('WebsiteAdmin.AnalyticsPage.updated').replace('%time', format(new Date(analytuicsAt), 'yyyy/MM/dd hh:mm:ss'))}</div>
                  </CardStyle>
                </Grid> */}
                <Grid item xs={12} md={4}>
                  <CardStyle>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      <SvgIconStyle src={`/icons/analytics_product.svg`} sx={{ height: 14 }} />
                      <WidgetTitleStyle>
                        {t('WebsiteAdmin.AnalyticsPage.widget.sales')}
                      </WidgetTitleStyle>
                    </Box>
                    {
                      !getAnalyticsLoading ?
                        (
                          <WidgetAmountStyle>
                            {toMoneyString(widgetData.countOrderIncome)}
                          </WidgetAmountStyle>
                        ) : (
                          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ height: 60 }}>
                            <CircularProgress />
                          </Box>
                        )
                    }
                  </CardStyle>
                </Grid>
                <Grid item xs={12} md={4}>
                  <CardStyle>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      <SvgIconStyle src={`/icons/analytics_request.svg`} sx={{ height: 14 }} />
                      <WidgetTitleStyle>
                        {t('WebsiteAdmin.AnalyticsPage.widget.ad')}
                      </WidgetTitleStyle>
                    </Box>
                    {
                      !getAnalyticsLoading ?
                        (
                          <WidgetAmountStyle>
                            {toMoneyString(widgetData.countRequestIncome)}
                          </WidgetAmountStyle>
                        ) : (
                          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ height: 60 }}>
                            <CircularProgress />
                          </Box>
                        )
                    }
                  </CardStyle>
                </Grid>
                <Grid item xs={12} md={4}>
                  <CardStyle>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      <SvgIconStyle src={`/icons/analytics_view.svg`} sx={{ height: 14 }} />
                      <WidgetTitleStyle>
                        {t('WebsiteAdmin.AnalyticsPage.widget.visit')}
                      </WidgetTitleStyle>
                    </Box>
                    {
                      !getAnalyticsLoading ?
                        (
                          <WidgetAmountStyle>
                            {widgetData.countPageView}
                          </WidgetAmountStyle>
                        ) : (
                          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ height: 60 }}>
                            <CircularProgress />
                          </Box>
                        )
                    }
                  </CardStyle>
                </Grid>
                <Grid item xs={12}>
                  <CardStyle>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '24px',
                      }}
                    >
                      <ChartTitleStyle>
                        {t('WebsiteAdmin.AnalyticsPage.chart.revenue')}
                      </ChartTitleStyle>
                      <RangeSelect setRange={setRange} range={range} onClickButton={(tab) => {
                        updateIncomeRange(tab.value);
                        getIncome(tab.value, false, true);
                      }} options={multipleSwitchOptions} />

                      {/* <MultipleSwitch
                        options={multipleSwitchOptions}
                        onClickButton={(tab) => {
                          updateIncomeRange(tab.value);
                          getIncome(tab.value, false, true);
                        }}
                      /> */}
                    </Box>
                    {
                      !getAnalyticsLoading ?
                        (
                          <ReactApexChart
                            options={incomeChart.options}
                            series={incomeChart.series}
                            type="area"
                            height={300}
                          />
                        ) : (
                          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ height: 315 }}>
                            <CircularProgress />
                          </Box>
                        )
                    }
                  </CardStyle>
                </Grid>
                <Grid item xs={12}>
                  <CardStyle>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '24px',
                      }}
                    >
                      <ChartTitleStyle>
                        {t('WebsiteAdmin.AnalyticsPage.chart.frequency')}
                      </ChartTitleStyle>
                      <RangeSelect setRange={setRange} range={range} onClickButton={(tab) => {
                        updateTimesRange(tab.value);
                        getTimes(tab.value, false, true);
                      }} options={multipleSwitchOptions} />
                      {/* <MultipleSwitch
                        options={multipleSwitchOptions}
                        onClickButton={(tab) => {
                          updateTimesRange(tab.value);
                          getTimes(tab.value, false, true);
                        }}
                      /> */}
                    </Box>
                    {
                      !getAnalyticsLoading ?
                        (
                          <ReactApexChart
                            options={timesChart.options}
                            series={timesChart.series}
                            type="area"
                            height={300}
                          />
                        ) : (
                          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ height: 315 }}>
                            <CircularProgress />
                          </Box>
                        )
                    }
                  </CardStyle>
                </Grid>
                {/* <Grid item xs={6}>
                  <CardStyle>
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginBottom: "24px" }}>
                      <ChartTitleStyle>{t('WebsiteAdmin.AnalyticsPage.chart.top.products.clicked')}</ChartTitleStyle>
                      <MultipleSwitch options={multipleSwitchOptions} onClickButton={(tab)=>{updateTop5ProducrsRange(tab.value)}}/>
                    </Box>
                    <ReactApexChart options={chartTop5Products.options} series={chartTop5Products.series} type="bar" height={300} />
                  </CardStyle>
                </Grid> */}
                {/* <Grid item xs={6}>
                  <CardStyle>
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginBottom: "24px" }}>
                      <ChartTitleStyle>{t('WebsiteAdmin.AnalyticsPage.chart.top.coupons.used')}</ChartTitleStyle>
                      <MultipleSwitch options={multipleSwitchOptions} onClickButton={(tab)=>{updateCouponUsageRange(tab.value)}}/>
                    </Box>
                    <ReactApexChart options={chartCouponUsage.options} series={chartCouponUsage.series} type="bar" height={300} />
                  </CardStyle>
                </Grid> */}
                <Grid item md={6} xs={12}>
                  <CardStyle>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '24px',
                      }}
                    >
                      <ChartTitleStyle>
                        {t('WebsiteAdmin.AnalyticsPage.chart.top.page.views')}
                      </ChartTitleStyle>
                      <RangeSelect setRange={setRange} range={range} onClickButton={(tab) => {
                        updateTop5PageViewRange(tab.value);
                        getTop5PageView(tab.value, false, true);
                      }} options={multipleSwitchOptions} />
                      {/* <MultipleSwitch
                        options={multipleSwitchOptions}
                        onClickButton={(tab) => {
                          updateTop5PageViewRange(tab.value);
                          getTop5PageView(tab.value, false, true);
                        }}
                      /> */}
                    </Box>
                    {
                      !getAnalyticsLoading ?
                        (
                          <ReactApexChart
                            options={top5PageViewChart.options}
                            series={top5PageViewChart.series}
                            type="bar"
                            height={300}
                          />
                        ) : (
                          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ height: 315 }}>
                            <CircularProgress />
                          </Box>
                        )
                    }
                  </CardStyle>
                </Grid>
                <Grid item md={6} xs={12}>
                  <CardStyle>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '24px',
                      }}
                    >
                      <ChartTitleStyle>
                        {t('WebsiteAdmin.AnalyticsPage.chart.top.selling product')}
                      </ChartTitleStyle>
                      <RangeSelect setRange={setRange} range={range} onClickButton={(tab) => {
                        updateTop3SalesRange(tab.value);
                        getTop3Sales(tab.value, false, true);
                      }} options={multipleSwitchOptions} />
                      {/* <MultipleSwitch
                        options={multipleSwitchOptions}
                        onClickButton={(tab) => {
                          updateTop3SalesRange(tab.value);
                          getTop3Sales(tab.value, false, true);
                        }}
                      /> */}
                    </Box>
                    {
                      !getAnalyticsLoading ?
                        (
                          <ReactApexChart
                            options={top3salesChart.options}
                            series={top3salesChart.series}
                            type="donut"
                            height={346}
                          />
                        ) : (
                          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ height: 315 }}>
                            <CircularProgress />
                          </Box>
                        )
                    }
                  </CardStyle>
                </Grid>
                <Grid item xs={12}>
                  <CardStyle>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '24px',
                      }}
                    >
                      <ChartTitleStyle>
                        {t('WebsiteAdmin.AnalyticsPage.chart.ad.request')}
                      </ChartTitleStyle>
                      <RangeSelect setRange={setRange} range={range} onClickButton={(tab) => {
                        updateRequestRange(tab.value);
                        getRequest(tab.value, false, true);
                      }} options={multipleSwitchOptions} />
                      {/* <MultipleSwitch
                        options={multipleSwitchOptions}
                        onClickButton={(tab) => {
                          updateRequestRange(tab.value);
                          getRequest(tab.value, false, true);
                        }}
                      /> */}
                    </Box>
                    {
                      !getAnalyticsLoading ?
                        (
                          <ReactApexChart
                            options={requestChart.options}
                            series={requestChart.series}
                            type="bar"
                            height={300}
                          />
                        ) : (
                          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ height: 315 }}>
                            <CircularProgress />
                          </Box>
                        )
                    }
                  </CardStyle>
                </Grid>
                <Grid item xs={12}>
                  <CardStyle>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '24px',
                      }}
                    >
                      <ChartTitleStyle>
                        {t('WebsiteAdmin.AnalyticsPage.chart.top.page.ad.request')}
                      </ChartTitleStyle>
                      <RangeSelect setRange={setRange} range={range} onClickButton={(tab) => {
                        updateTop5PageRequestRange(tab.value);
                        getTop5PageRequest(tab.value, false, true);
                      }} options={multipleSwitchOptions} />
                      {/* <MultipleSwitch
                        options={multipleSwitchOptions}
                        onClickButton={(tab) => {
                          updateTop5PageRequestRange(tab.value);
                          getTop5PageRequest(tab.value, false, true);
                        }}
                      /> */}
                    </Box>
                    {
                      !getAnalyticsLoading ?
                        (
                          <ReactApexChart
                            options={top5PageRequestChart.options}
                            series={top5PageRequestChart.series}
                            type="bar"
                            height={300}
                          />
                        ) : (
                          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ height: 315 }}>
                            <CircularProgress />
                          </Box>
                        )
                    }
                  </CardStyle>
                </Grid>
              </Grid>
            </Container>
          </Page>
        </DashboardLayout>
      </AdminGuard>
    );
  } else {
    return null;
  }
}