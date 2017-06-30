import { TTAnalyticsPage } from './app.po';

describe('ttanalytics App', () => {
  let page: TTAnalyticsPage;

  beforeEach(() => {
    page = new TTAnalyticsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
