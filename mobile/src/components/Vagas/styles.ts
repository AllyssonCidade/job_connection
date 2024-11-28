import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 108px;
  display: flex;
  justify-content: space-between;
  align-self: center;
  flex-direction: row;
  padding: 10px 20px;
  margin-bottom: 10px;
  elevation: 0.3;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: #0066ff;
  font-weight: bolder;
`;
export const Text = styled.Text`
  font-size: 18px;
  color: #0066ff;
`;

export const ViewFlexColumn = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ViewFlexRow = styled.View`
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
