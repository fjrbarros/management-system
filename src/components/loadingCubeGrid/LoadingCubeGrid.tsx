import { ContentLoading, Cube, CubeGrid } from './LoadingCubeGrid.styles';

export const LoadingCubeGrid = () => {
  const animationDelays = [
    '0.2s',
    '0.3s',
    '0.4s',
    '0.1s',
    '0.2s',
    '0.3s',
    '0s',
    '0.1s',
    '0.2s',
  ];

  return (
    <ContentLoading data-testid="content-loading">
      <CubeGrid>
        {animationDelays.map((delay, index) => (
          <Cube
            key={index}
            data-testid="cube"
            style={{ animationDelay: delay }}
          />
        ))}
      </CubeGrid>
    </ContentLoading>
  );
};
