const getTextFromMessage = (identifier, splittedMsg = []) => {
  let text = splittedMsg.find((msg) => msg.indexOf(identifier) > -1);
  text = text.replace(`${identifier}:`, "");

  return text;
};

const isIssue = (msg) => msg.text.indexOf('/issue') > -1

const parse = (msgData) => {
  const msg = msgData.text;
  const msgArr = msg.replace('/issue ', '').split("\n");

  const date = getTextFromMessage("Date", msgArr);
  const userId = getTextFromMessage("User ID", msgArr);
  const rideId = getTextFromMessage("Ride ID", msgArr);
  const title = getTextFromMessage("Title", msgArr);
  const description = getTextFromMessage("Description", msgArr);

  return {
    date,
    userId,
    rideId,
    title,
    description,
    from: {
      firstName: msgData.from.first_name,
      lastName: msgData.from.last_name,
    },
  };
};

module.exports = {
  isIssue,
  parse
};