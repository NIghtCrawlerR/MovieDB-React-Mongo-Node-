import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    // logErrorToMyService(error, errorInfo);
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return (
        <div>
          <p>Error has occured: </p>
          <p>{error}</p>
          <p>Error info: </p>
          <p>{errorInfo}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;