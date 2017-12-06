import { IMFormsPage } from './app.po';

describe('imforms App', () => {
  let page: IMFormsPage;

  beforeEach(() => {
    page = new IMFormsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
