table 50113 "Notification"
{
    DataClassification = ToBeClassified;

    fields
    {
        field(1; "No_"; Integer)
        {
            AutoIncrement = true;
        }
        field(2; "Contenu"; Text[225])
        {
      
        }
          field(3; "Priority"; Option)
        {
            OptionMembers = High,Normal;
            OptionCaption = 'High,Normal';
        }
      
          field(4; "Statut"; Option)
        {
            OptionMembers = Reading,NotReading;
            OptionCaption = 'Reading,NotReading';
        }
         field(5; "ReclamationId"; Text[50])
        { }
         field(6; "UserId"; Text[50])
        { }

    }
}